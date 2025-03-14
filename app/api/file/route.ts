import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const filename = searchParams.get("filename")
  //const type = searchParams.get("type")

  if (!filename) {
    return new NextResponse("Fichier non trouvé", { status: 404 })
  }
  const diretory =
    process.env.NODE_ENV === "production"
      ? "/tmp"
      : path.join(process.cwd(), "public")
  const filePath = path.join(diretory, filename)

  try {
    const fileBuffer = fs.readFileSync(filePath)
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error(error)
    return new NextResponse("Fichier non trouvé", { status: 404 })
  }
}
