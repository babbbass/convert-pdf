import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import Mailgun from "mailgun.js"
import formData from "form-data"

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
    const to = form.get("to")

    if (!attachments || !subject || !message || !to) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }
    const mailgun = new Mailgun(formData)
    const client = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY!,
    })
    const email = user.emailAddresses[0].emailAddress
    const fileBuffer = Buffer.from(await attachments.arrayBuffer())

    const response = await client.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: email,
      to: to as string,
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

    return NextResponse.json({ success: true, response: response })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { message: "Failed to send email", error: (error as Error).message },
      { status: 500 }
    )
  }
}
