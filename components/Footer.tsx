import Link from "next/link"
import { Logo } from "./Logo"

export function Footer() {
  return (
    <footer className='flex flex-col mt-10 items-center justify-between md:text-2xl min-h-24 w-full p-2 border-t gap-3 border-slate-200'>
      <section>
        <Logo />
      </section>
      <section className='flex justify-center gap-3 items-center w-full'>
        <div className='flex flex-col md:flex-row gap-3 justify-start h-24 md:h-fit'>
          <Link href={""} className='text-primary text-sm underline'>
            politique de confidentialité
          </Link>
          <Link href={""} className='text-primary text-sm underline'>
            conditions de service
          </Link>
        </div>
        <div className='flex flex-col gap-3 md:flex-row h-24 md:h-fit'>
          <Link href={""} className='text-primary text-sm underline'>
            politique de sécurité
          </Link>
          <Link href={""} className='text-primary text-sm underline'>
            paramètres des cookies
          </Link>
        </div>
      </section>
      <section className='text-sm text-primary'>
        ©2025 PDF Technologies, Inc., pixeloft Company. Tous drois réservés.
      </section>
    </footer>
  )
}
