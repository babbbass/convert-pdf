import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { INVOICE_CUSTOMER, COSTS, ACCOUNTANT } from "@/lib/constants"

export async function POST(req: NextRequest) {
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

    // Convert file in buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    // Define path of the public folder

    // const publicDir = path.join(process.cwd(), "public")
    const publicDir =
      process.env.NODE_ENV === "production"
        ? "/tmp"
        : path.join(process.cwd(), "public")
    const targetFolder =
      Number(classification) === 1
        ? INVOICE_CUSTOMER
        : Number(classification) === 0
        ? COSTS
        : ACCOUNTANT
    const targetPath = path.join(
      publicDir,
      process.env.NODE_ENV === "production" ? "" : targetFolder
    )

    // check and create target folder
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true })
    }

    // Save file
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
