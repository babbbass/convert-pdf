import { NextResponse } from "next/server"
import Mailgun from "mailgun.js"
import formData from "form-data"
import prisma from "@/lib/prisma"
import { DOCUMENT_SENT } from "@/lib/constants"

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const attachments = form.get("files") as File
    const messageTo = form.get("emailTo") as string
    const filePath = form.get("filePath") as string

    if (!attachments || !messageTo) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findFirst({
      where: { email: messageTo },
      select: { id: true },
    })
    if (user) {
      return NextResponse.json(
        { message: "user already exist" },
        { status: 409 }
      )
    }

    const mailgun = new Mailgun(formData)
    const client = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY!,
      url:
        process.env.NODE_ENV === "production"
          ? "https://api.eu.mailgun.net"
          : "",
    })

    const fileBuffer = Buffer.from(await attachments.arrayBuffer())

    const response = await client.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: "cleverdocs.app <no-reply@mg.cleverdocs.app>",
      to: messageTo,
      subject: "Document cleverdocs.app",
      text: "Voici votre document généré sur cleverdocs.app à bientôt",
      attachment: [
        {
          filename: attachments.name,
          data: fileBuffer,
          contentType: attachments.type,
          knownLength: attachments.size,
        },
      ],
    })

    const document = await prisma.document.findFirstOrThrow({
      where: { url: filePath },
      select: { id: true },
    })

    await prisma.user.create({
      data: {
        clerkUserId: "",
        id: messageTo,
        email: messageTo,
      },
    })

    await prisma.history.updateMany({
      where: { documentId: document.id },
      data: { action: DOCUMENT_SENT, recipient: messageTo },
    })

    return NextResponse.json({ success: true, response: response })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { message: "Failed to send email", error: (error as Error).message },
      { status: 500 }
    )
  }
}
