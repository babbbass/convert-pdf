"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function handleDelete(documentId: string | undefined) {
  try {
    await prisma.history.deleteMany({ where: { documentId } })
    await prisma.document.delete({ where: { id: documentId } })
    revalidatePath("/historique")
  } catch (error) {
    console.error("Échec de la suppression:", error)
    throw error
  }
}
