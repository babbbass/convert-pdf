import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "./ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Loader2, Send, Eye } from "lucide-react"
import { useGlobalStore } from "@/stores/globalStore"
import { toast } from "sonner"

export function LandingEmailTrigger() {
  const [isOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { document } = useGlobalStore()
  const [isSended, setIsSended] = useState(false)

  const formSchema = z.object({
    emailTo: z.string().email("Veuillez entrer une adresse email valide"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailTo: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append("emailTo", values.emailTo.toLowerCase())

    if (document?.filePath) {
      const response = await fetch(document?.filePath)
      const blob = await response.blob()
      const file = new File([blob], "facture.pdf", {
        type: "application/pdf",
      })
      formData.append("files", file)
    }
    // console.log(typeof file, file)
    formData.append("filePath", document?.filePath || "")

    // console.log("Envoi du document à:", values.emailTo)
    const response = await fetch("/api/send-email-landing", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()
    console.log(response)
    if (!response.ok) {
      if (data.message === "user already exist") {
        toast("Adresse email deja utilisée", {
          style: {
            backgroundColor: "#c10007",
            color: "#f8fafc",
            padding: "10px",
          },
          position: "top-right",
        })

        setIsLoading(false)
        setIsDialogOpen(false)
        setIsSended(true)
        form.reset()
        return
      }
      throw new Error("Erreur lors de l'envoi de l'email")
    }

    toast("Email envoyé avec succès", {
      style: {
        backgroundColor: "#00a63e",
        color: "#f8fafc",
        padding: "10px",
      },
      position: "top-right",
    })

    setIsLoading(false)
    setIsDialogOpen(false)
    setIsSended(true)
    form.reset()
  }

  return isSended ? (
    <p className='text-green-600 font-medium'>Document envoyé</p>
  ) : (
    <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className={`flex items-center justify-center w-full bg-green-600 text-slate-50 px-6 py-4 cursor-pointer border border-green-600 rounded-2xl font-medium hover:bg-green-600/80 hover:text-slate-50 transition-colors duration-300 hover:border-green-600 ${
          isSended && "bg-green-600/10 text-slate-50 border-green-600/10 hidden"
        }`}
      >
        <Eye className='mr-2 h-5 w-5' />
        Voir votre PDF
      </DialogTrigger>

      <DialogContent className='bg-slate-50 rounded-2xl'>
        <DialogTitle className='font-bold text-lg text-primary text-center'>
          Entrez votre adresse email pour recevoir votre PDF
        </DialogTitle>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 bg-slate-50'
          >
            <FormField
              control={form.control}
              name='emailTo'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Entrez votre adresse email'
                      {...field}
                      className='border-card rounded-xl'
                    />
                  </FormControl>
                  <FormMessage className='text-red-700 font-medium italic' />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full bg-card text-card-foreground hover:bg-card/90 cursor-pointer'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className='mr-2 h-4 w-4' />
                  {`Envoyer l'email`}
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
