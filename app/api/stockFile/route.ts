import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { INVOICE_CUSTOMER, COSTS } from "@/lib/constants"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const classification = formData.get("classification") as string
    console.log("classification", classification, file)

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 }
      )
    }

    // Convertir le fichier en buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Définir le chemin du dossier
    const baseDir = path.join(process.cwd(), "public")
    const targetFolder = Number(classification) === 1 ? INVOICE_CUSTOMER : COSTS
    const targetPath = path.join(baseDir, targetFolder)

    // Vérifier et créer le dossier si besoin
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true })
    }

    // Sauvegarder le fichier
    const filePath = path.join(targetPath, file.name)
    fs.writeFileSync(filePath, buffer)

    return NextResponse.json({ success: true, filePath })
  } catch (error) {
    console.error("Erreur lors de l'upload:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'upload" },
      { status: 500 }
    )
  }
}
