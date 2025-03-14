import { Logo } from "./Logo"
import { Button } from "./ui/button"
import { ChevronRight } from "lucide-react"

export function Header() {
  return (
    <header className='flex flex-col md:flex-row bg-slate-50 border-b items-center justify-between md:text-2xl min-h-20 w-full p-2 sticky top-0 mb-10 gap-4'>
      <section className='flex flex-col gap-1'>
        <Logo />
        <p className='text-sm text-secondary font-medium italic'>
          Gestion intelligente des documents
        </p>
      </section>
      <section className='flex gap-2'>
        <Button className='bg-transparent border-0 text-secondary text-sm font-medium hover:bg-secondary hover:text-slate-50 hover:cursor-pointer transition-all duration-300 rounded-2xl'>
          Connexion <ChevronRight className='ml-0 h-4 w-4' />
        </Button>
        <Button className='bg-transparent border-0 text-secondary text-sm font-medium hover:bg-secondary hover:text-slate-50 hover:cursor-pointer transition-all duration-300 rounded-2xl'>
          Demo gratuite
        </Button>
      </section>
    </header>
  )
}
