import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export async function GET() {
  try {
    const clerkUser = await currentUser()

    if (!clerkUser) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser.id },
      include: {
        documents: {
          include: {
            history: {
              orderBy: {
                timestamp: "desc",
              },
            },
          },
        },
        sentHistories: {
          orderBy: {
            timestamp: "desc",
          },
          include: {
            document: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      receivedDocuments: user.documents,
      sentDocuments: user.sentHistories,
    })
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
