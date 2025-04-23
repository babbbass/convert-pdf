import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import {
  INVOICE_CUSTOMER,
  COSTS,
  ACCOUNTANT,
  DOCUMENT_DOWNLOADED,
} from "@/lib/constants"
import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const classification = formData.get("classification") as string
    const isGuest = formData.get("isGuest") === "true"

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 }
      )
    }

    // define the target folder
    const targetFolder =
      Number(classification) === 1
        ? INVOICE_CUSTOMER
        : Number(classification) === 0
        ? COSTS
        : ACCOUNTANT

    // Upload towards Vercel Blob
    const { url } = await put(`${targetFolder}/${file.name}`, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    let user
    const clerkUser = await currentUser()

    if (clerkUser) {
      // Utilisateur connecté
      user = await prisma.user.findUnique({
        where: { clerkUserId: clerkUser.id },
      })

      if (!user) {
        return NextResponse.json(
          { error: "Utilisateur non trouvé" },
          { status: 404 }
        )
      }
    } else if (isGuest) {
      // Utilisateur invité - créer un utilisateur temporaire
      const guestId = `guest_${uuidv4()}`
      user = await prisma.user.upsert({
        where: { clerkUserId: guestId },
        update: {},
        create: {
          clerkUserId: guestId,
          email: `${guestId}@temp.user`,
          firstName: "Guest",
          lastName: "User",
          isGuest: true,
        },
      })
    } else {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const document = await prisma.document.create({
      data: {
        name: file.name,
        url: url,
        type: targetFolder,
        user: { connect: { id: user.id } },
        isGuestDocument: isGuest,
        history: {
          create: {
            sender: { connect: { id: user.id } },
            recipient: "",
            action: DOCUMENT_DOWNLOADED,
          },
        },
      },
      include: {
        history: true,
      },
    })

    return NextResponse.json({
      success: true,
      documentId: document.id,
      filePath: url,
      isGuest: isGuest, // Informer le front que c'est un document temporaire
    })
  } catch (error) {
    console.error("Erreur lors de l'upload:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'upload" },
      { status: 500 }
    )
  }
}
