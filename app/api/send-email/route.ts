import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const formData = await req.formData()
  const {
    files: attachments,
    subject,
    message,
    to,
  } = Object.fromEntries(formData.entries())
  if (!attachments || !subject || !message || !to) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    )
  }

  if (!(attachments instanceof File)) {
    return NextResponse.json(
      { message: "Invalid file attachment" },
      { status: 400 }
    )
  }

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: to as string,
      subject: subject as string,
      text: message as string,
      attachments: [
        {
          filename: attachments.name as string,
          content: Buffer.from(await attachments.arrayBuffer()).toString(
            "base64"
          ),
        },
      ],
    })

    return NextResponse.json({ success: true, response })
  } catch (error: unknown) {
    console.error("Error sending email:", error)
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to send email", error: error.message },
        { status: 500 }
      )
    }
  }
}
