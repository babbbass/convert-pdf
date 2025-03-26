"use client"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EmailForm } from "./EmailForm"
import { Mail } from "lucide-react"

export function SendEmailTrigger({
  isOpen,
  setIsDialogOpen,
}: {
  isOpen: boolean
  setIsDialogOpen: (isOpen: boolean) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        onClick={() => setIsDialogOpen(true)}
        className='flex items-center justify-center w-full bg-green-600 text-slate-50 px-6 py-4 cursor-pointer border border-green-600 rounded-2xl font-medium hover:bg-green-600/80 hover:text-slate-50 transition-colors duration-300 hover:border-green-600'
      >
        <Mail className='mr-2 h-5 w-5' />
        Envoyer votre PDF
      </DialogTrigger>
      <DialogContent className='bg-slate-50 rounded-2xl'>
        <DialogTitle className='font-bold text-2xl text-secondary text-center'>
          Envoyez votre PDF
        </DialogTitle>
        <EmailForm onClose={() => setIsDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
