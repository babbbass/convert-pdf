"use client"
import { Button } from "./ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Dropdown } from "./Dropdown"

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
          <UserButton />
        </SignedIn>
      </div>
      <div className='md:hidden'>
        <Dropdown />
      </div>
    </section>
  )
}
