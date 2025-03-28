import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
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

    return NextResponse.json({ success: true, filePath: url })
  } catch (error) {
    console.error("Erreur lors de l'upload:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'upload" },
      { status: 500 }
    )
  }
}
