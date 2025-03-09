"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// import { useToast } from '@/hooks/use-toast';
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  to: z.string().email("Email invalide"),
  subject: z.string().min(1, "Le sujet est requis"),
  message: z.string().min(1, "Le message est requis"),
  files: z.any(),
})

export function EmailForm() {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append("to", values.to)
      formData.append("subject", values.subject)
      formData.append("message", values.message)

      const fileInput =
        document.querySelector<HTMLInputElement>('input[type="file"]')
      if (fileInput?.files) {
        Array.from(fileInput.files).forEach((file) => {
          formData.append("files", file)
        })
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de l'email")
      }

      toast({
        title: "Succès",
        description: "Email envoyé avec succès",
      })

      form.reset()
      if (fileInput) {
        fileInput.value = ""
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='to'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destinataire</FormLabel>
              <FormControl>
                <Input placeholder='email@exemple.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='subject'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sujet</FormLabel>
              <FormControl>
                <Input placeholder="Sujet de l'email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Votre message...'
                  className='min-h-[120px]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='files'
          render={() => (
            <FormItem>
              <FormLabel>Pièces jointes (PDF uniquement)</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  accept='.pdf'
                  multiple
                  className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className='mr-2 h-4 w-4' />
              Envoyer l'email
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
