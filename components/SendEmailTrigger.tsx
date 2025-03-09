import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogHeader,
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
        {/* <DialogHeader> */}
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        {/*<DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader> */}
        <EmailForm />
      </DialogContent>
    </Dialog>
  )
}
