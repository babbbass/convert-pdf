import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EmailForm } from "./EmailForm"
import { Mail } from "lucide-react"

export function SendEmailTrigger() {
  return (
    <Dialog>
      <DialogTrigger className='flex items-center bg-slate-50 text-secondary px-6 py-4 cursor-pointer border border-sky-500 rounded-2xl font-medium hover:bg-sky-500 hover:text-slate-50 transition-colors duration-300'>
        <Mail className='mr-2 h-5 w-5' />
        Envoi PDF
      </DialogTrigger>
      <DialogContent className='bg-slate-50 rounded-2xl w-full'>
        <DialogTitle className='font-bold text-2xl text-secondary text-center'>
          Envoyez votre PDF
        </DialogTitle>
        <EmailForm />
      </DialogContent>
    </Dialog>
  )
}
