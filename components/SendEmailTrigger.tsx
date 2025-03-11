import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EmailForm } from "./EmailForm"

export function SendEmailTrigger() {
  return (
    <Dialog>
      <DialogTrigger className='bg-purple-700 text-primary-foreground rounded-md px-4 py-2 cursor-pointer'>
        Envoyer le Pdf
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Envoyez votre PDF</DialogTitle>
        <EmailForm />
      </DialogContent>
    </Dialog>
  )
}
