"use client"
import { Button } from "./ui/button"
import { ChevronRight, House, Mail, FileStack } from "lucide-react"
import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Dropdown } from "./Dropdown"
import { InstallPWAButton } from "@/components/InstallPWAButton"

export const Menu = () => {
  return (
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
        <SignedIn>
          <Link
            href={"/accueil"}
            className='items-center hidden md:inline-flex bg-transparent border-0 text-primary text-sm hover:underline hover:cursor-pointer transition-all duration-300 rounded-2xl'
          >
            <House className='mr-1 h-4 w-4 text-secondary' /> Home
          </Link>
          <Link
            href={"/historique"}
            className='items-center hidden md:inline-flex bg-transparent border-0 text-primary text-sm 
             hover:underline hover:cursor-pointer transition-all duration-300 rounded-2xl'
          >
            <FileStack className='mr-1 h-4 w-4 text-secondary' />
            Historique
          </Link>
          <Link
            href={"/contact"}
            className='items-center hidden md:inline-flex bg-transparent border-0 text-primary text-sm 
             hover:underline hover:cursor-pointer transition-all duration-300 rounded-2xl'
          >
            <Mail className='mr-1 h-4 w-4 text-secondary' /> Contact
          </Link>
          <InstallPWAButton />
          <UserButton />
        </SignedIn>
      </div>
      <div className='md:hidden'>
        <Dropdown />
      </div>
    </section>
  )
}
