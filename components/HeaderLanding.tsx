import { Logo } from "./Logo"
import { SignedOut } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "./ui/button"
import { ChevronRight } from "lucide-react"
import { Dropdown } from "./Dropdown"

export function HeaderLanding({ className }: Readonly<{ className?: string }>) {
  return (
    <header
      className={`flex max-w-6xl mx-auto items-center justify-between md:text-2xl min-h-16 w-full p-1 px-4 sticky top-0 mb-2 md:mb-20 gap-4 border-slate-200 bg-slate-50 ${className}`}
    >
      <section className='flex flex-col gap-1'>
        <Logo />
      </section>
      <section className='flex gap-2'>
        <div className='hidden md:flex gap-2'>
          <SignedOut>
            <Link href={"/sign-in"}>
              <Button className='hidden md:inline-flex bg-transparent border-0 text-secondary text-sm font-medium hover:bg-secondary hover:text-slate-50 hover:cursor-pointer transition-all duration-300 rounded-2xl'>
                Connexion <ChevronRight className='ml-0 h-4 w-4' />
              </Button>
            </Link>
            {/* <SignUpButton /> */}
          </SignedOut>
        </div>
        <div className='md:hidden'>
          <Dropdown landing />
        </div>
      </section>
    </header>
  )
}
