"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { sendContactEmail } from "@/actions/sendEmailContact"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Textarea } from "./ui/textarea"

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z
    .string({ required_error: "L'email est obligatoire." })
    .min(1, { message: "L'email est obligatoire." })
    .email({ message: "Adresse email invalide." }),
  subject: z
    .string({ required_error: "Le sujet est obligatoire." })
    .min(1, { message: "Le sujet est obligatoire." }),
})

type FormData = z.infer<typeof formSchema>

export function ContactForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
    },
  })

  async function onSubmit(values: FormData) {
    console.log("Données du formulaire soumises:", values)
    try {
      const response = await sendContactEmail(values)
      console.log("email contact", response)
      if (response.success) {
        toast("Email envoyé avec succès", {
          style: {
            backgroundColor: "#00a63e",
            color: "#f8fafc",
            padding: "10px",
          },
          position: "top-right",
        })
      }
      form.reset()
    } catch (err) {
      console.log(err)
      toast("Erreur dans l'envoi de l'email, veuillez reessayer", {
        style: {
          backgroundColor: "#c10007",
          color: "#f8fafc",
          padding: "10px",
        },
        position: "top-right",
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 w-full max-w-lg mx-auto p-6 md:p-8 bg-white border border-gray-200 rounded-lg shadow-md'
      >
        <div className=''>
          <h2 className='text-2xl md:text-3xl font-bold tracking-tight text-primary mb-4 text-center'>
            Contactez-nous
          </h2>
          <h3 className='text-base md:text-lg font-bold tracking-tight text-secondary mb-10 text-center'>
            Nous vous répondrons dans les 24 heures
          </h3>
        </div>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-primary'>Prénom</FormLabel>
              <FormControl>
                <Input
                  placeholder='Jean'
                  {...field}
                  className='border-gray-300 focus-visible:ring-sky-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-primary placeholder:text-gray-200'>
                Nom
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Dupont'
                  {...field}
                  className='border-gray-300 focus-visible:ring-sky-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='placeholder-blue-300'>
                Email <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='jean.dupont@email.com'
                  {...field}
                  className='border-gray-300 focus-visible:ring-sky-500'
                />
              </FormControl>
              <FormMessage />{" "}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='subject'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-primary placeholder:text-gray-200'>
                Sujet <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Demande d'information sur CleverDocs"
                  {...field}
                  className='border-gray-300 focus-visible:ring-sky-500 h-36'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={form.formState.isSubmitting}
          className={`w-full text-slate-50 rounded-xl bg-secondary hover:bg-secondary/80 focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer`}
        >
          {form.formState.isSubmitting
            ? "Envoi en cours..."
            : "Envoyer le message"}
        </Button>
      </form>
    </Form>
  )
}
