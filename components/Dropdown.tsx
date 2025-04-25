"use client"

import { useState, useEffect } from "react"
import { Logo } from "./Logo"
import { Button } from "./ui/button"
import {
  ChevronRight,
  Menu as MenuIcon,
  X,
  House,
  FileStack,
} from "lucide-react"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { InstallPWAButton } from "@/components/InstallPWAButton"

export function Dropdown({ landing }: { landing: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    // Nettoyage lors du démontage du composant
    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])

  return (
    <div className='relative'>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className='bg-primary border-0 text-slate-50 text-sm font-medium  hover:cursor-pointer transition-all duration-300 rounded-2xl relative z-50'
      >
        {isOpen ? (
          <X className='h-10 w-10' />
        ) : (
          <MenuIcon className='h-10 w-10' />
        )}
      </Button>

      <div
        className={`absolute right-0 -top-10 mt-2 w-screen rounded-md shadow-lg bg-slate-50 ring-1 ring-gray-100 min-h-screen h-full p-4 py-28 ring-opacity-5 transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-x-[calc(0%+14px)]"
            : "translate-x-[calc(100%+18px)]"
        }`}
      >
        <section className='flex flex-col gap-2 items-center'>
          <div onClick={() => setIsOpen(false)}>
            {" "}
            <Logo />{" "}
            <p className='text-sm text-secondary font-medium italic mt-2'>
              Gestion intelligente des documents
            </p>
          </div>
          <p className='w-5/6 text-primary text-lg font-medium text-center mt-4 border-b pb-2 border-slate-200'></p>
          <div className='flex flex-col gap-5 mt-2 items-start w-5/6 px-2 py-4 text-primary'>
            {!landing && (
              <>
                <Link
                  href={"/accueil"}
                  onClick={() => setIsOpen(false)}
                  className='flex'
                >
                  <House className='mr-2 h-5 w-5' /> Accueil
                </Link>
                <Link
                  href={"/historique"}
                  onClick={() => setIsOpen(false)}
                  className='flex'
                >
                  <FileStack className='mr-2 h-5 w-5' /> Historique
                </Link>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </>
            )}

            <SignedOut>
              <Link href={"/sign-in"}>
                <Button className='inline-flex md:hidden bg-slate-100 border-0 text-secondary text-sm font-medium hover:bg-secondary hover:text-slate-50 hover:cursor-pointer transition-all duration-300 rounded-2xl'>
                  Connexion <ChevronRight className='ml-0 h-4 w-4' />
                </Button>
              </Link>
            </SignedOut>
            {!landing && <InstallPWAButton />}
          </div>
        </section>
      </div>
    </div>
  )
}
