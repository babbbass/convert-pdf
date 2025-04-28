"use server"

import * as z from "zod"
import Mailgun from "mailgun.js"
import FormData from "form-data"

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  subject: z.string().min(1),
})

type ActionResult = {
  success: boolean
  message: string
}

export async function sendContactEmail(
  formData: unknown
): Promise<ActionResult> {
  console.log("action email contact")
  const parsedData = formSchema.safeParse(formData)

  if (!parsedData.success) {
    console.error("Validation échouée côté serveur:", parsedData.error)
    return { success: false, message: "Données invalides fournies." }
  }

  const { firstName, lastName, email, subject } = parsedData.data

  const mailgun = new Mailgun(FormData)

  try {
    const client = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY!,
      url:
        process.env.NODE_ENV === "production"
          ? process.env.MAILGUN_API_URL
          : "",
    })

    await client.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: `CleverDocs Contact <${process.env.MAILGUN_SENDER}>`,
      replyTo: email,
      to: process.env.CONTACT_FORM_RECIPIENT_EMAIL,
      subject: subject as string,
      text: `Message de ${email} \n ${firstName} ${lastName} \n ${subject} `,
    })

    return { success: true, message: "Votre message a bien été envoyé !" }
  } catch (error) {
    console.error("Erreur lors de l'appel à Mailgun:", error)
    return {
      success: false,
      message: "Une erreur inattendue s'est produite. Réessayez plus tard.",
    }
  }
}
