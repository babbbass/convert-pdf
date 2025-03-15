"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { ChevronRight, Menu as MenuIcon, X } from "lucide-react"
import { Logo } from "./Logo"

const Dropdown = () => {
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
        className={`absolute right-0 -top-10 mt-2 w-48 rounded-md shadow-lg bg-slate-50 ring-1 ring-gray-100 h-screen p-4 py-28 ring-opacity-5 transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-x-[calc(0%+14px)]"
            : "translate-x-[calc(100%+18px)]"
        }`}
      >
        <section className='flex flex-col gap-2'>
          <Logo />
          <p className='text-sm text-secondary font-medium text-center'>Menu</p>
          <div className='flex flex-col gap-2 mt-2 border-t pt-4 border-slate-200'>
            <Button className='inline-flex md:hidden bg-transparent border-0 text-secondary text-sm font-medium hover:bg-secondary hover:text-slate-50 hover:cursor-pointer transition-all duration-300 rounded-2xl'>
              Connexion <ChevronRight className='ml-0 h-4 w-4' />
            </Button>
            <Button className='inline-flex md:hidden bg-transparent border-0 text-secondary text-sm font-medium hover:bg-secondary hover:text-slate-50 hover:cursor-pointer transition-all duration-300 rounded-2xl'>
              Demo gratuite
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

export const Menu = () => {
  return (
    <section className='flex gap-2'>
      <Button className='hidden md:inline-flex bg-transparent border-0 text-secondary text-sm font-medium hover:bg-secondary hover:text-slate-50 hover:cursor-pointer transition-all duration-300 rounded-2xl'>
        Connexion <ChevronRight className='ml-0 h-4 w-4' />
      </Button>
      <Button className='hidden md:inline-flex bg-transparent border-0 text-secondary text-sm font-medium hover:bg-secondary hover:text-slate-50 hover:cursor-pointer transition-all duration-300 rounded-2xl'>
        Demo gratuite
      </Button>
      <div className='md:hidden'>
        <Dropdown />
      </div>
    </section>
  )
}
