import { Logo } from "@/components/Logo"
import React from "react"

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex flex-col flex-1 justify-center items-center p-4'>
      <div className='flex flex-col gap-1 justify-center items-center'>
        <Logo />
        <p className='text-sm text-secondary font-medium italic'>
          Gestion intelligente des documents
        </p>
      </div>
      {children}
    </div>
  )
}
