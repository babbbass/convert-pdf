import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const document = await prisma.document.findUnique({
      where: { id: params.id },
      include: { user: true },
    })

    if (!document) {
      return NextResponse.json(
        { error: "Document non trouvé" },
        { status: 404 }
      )
    }

    // Vérifier que l'utilisateur a accès au document
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    })

    if (document.userId !== user?.id) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    // Enregistrer l'action de téléchargement dans l'historique
    await prisma.history.create({
      data: {
        document: { connect: { id: document.id } },
        sender: { connect: { id: user.id } },
        action: "DOWNLOADED",
        recipient: "",
      },
    })

    // Rediriger vers l'URL du fichier
    return NextResponse.redirect(document.url)
  } catch (error) {
    console.error("Erreur lors du téléchargement:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
