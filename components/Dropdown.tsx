"use client"

import { useState } from "react"
import { Logo } from "./Logo"
import { Button } from "./ui/button"
import { ChevronRight, Menu as MenuIcon, X } from "lucide-react"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { InstallPWAButton } from "@/components/InstallPWAButton"

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative'>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className='bg-transparent border-0 text-secondary text-sm font-medium hover:bg-secondary hover:text-slate-50 hover:cursor-pointer transition-all duration-300 rounded-2xl relative z-50'
      >
        {isOpen ? (
          <X className='h-10 w-10' />
        ) : (
          <MenuIcon className='h-10 w-10' />
        )}
      </Button>

      <div
        className={`absolute right-0 -top-10 mt-2 w-screen rounded-md shadow-lg bg-slate-50 ring-1 ring-gray-100 h-screen p-4 py-28 ring-opacity-5 transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-x-[calc(0%+14px)]"
            : "translate-x-[calc(100%+18px)]"
        }`}
      >
        <section className='flex flex-col gap-2 items-center'>
          <Logo />
          <p className='w-5/6 text-secondary font-medium text-center mt-4 border-b pb-2 border-slate-200'>
            Menu
          </p>
          <div className='flex flex-col gap-4 mt-2 items-start w-5/6 px-2 py-4 text-secondary text-sm font-medium'>
            <Link href={"/historique"}>Historique</Link>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button className='inline-flex md:hidden bg-transparent border-0 text-secondary text-sm font-medium hover:bg-secondary hover:text-slate-50 hover:cursor-pointer transition-all duration-300 rounded-2xl'>
                Connexion <ChevronRight className='ml-0 h-4 w-4' />
              </Button>
            </SignedOut>
            <InstallPWAButton />
          </div>
        </section>
      </div>
    </div>
  )
}
