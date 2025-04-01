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

export async function POST(req: NextRequest) {
  const clerkUser = await currentUser()

  if (!clerkUser) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: clerkUser.id },
  })

  if (!user) {
    return NextResponse.json(
      { error: "Utilisateur non trouvé" },
      { status: 404 }
    )
  }
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const classification = formData.get("classification") as string

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

    const document = await prisma.document.create({
      data: {
        name: file.name,
        url: url,
        user: { connect: { id: user.id } },
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
    })
  } catch (error) {
    console.error("Erreur lors de l'upload:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'upload" },
      { status: 500 }
    )
  }
}
