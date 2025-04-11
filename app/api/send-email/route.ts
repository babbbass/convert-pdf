import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import Mailgun from "mailgun.js"
import formData from "form-data"
import prisma from "@/lib/prisma"
import { DOCUMENT_SENT } from "@/lib/constants"

export async function POST(req: Request) {
  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
    const form = await req.formData()
    const attachments = form.get("files") as File
    const subject = form.get("subject")
    const message = form.get("message")
    const messageTo = form.get("to") as string
    const filePath = form.get("filePath") as string

    if (!attachments || !subject || !message || !messageTo) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }
    const mailgun = new Mailgun(formData)
    const client = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY!,
      url: "https://api.eu.mailgun.net",
    })
    const email = user.emailAddresses[0].emailAddress
    const fileBuffer = Buffer.from(await attachments.arrayBuffer())

    const response = await client.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: email,
      to: messageTo,
      subject: subject as string,
      text: message as string,
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
