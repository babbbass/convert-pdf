import Link from "next/link"
import { Logo } from "./Logo"

export function Footer({ className }: Readonly<{ className?: string }>) {
  return (
    <footer
      className={`flex flex-col mt-auto items-start justify-between md:text-2xl min-h-24 w-full p-2 md:pt-3 px-4 border-t gap-4 border-slate-200 text-gray-500 italic ${className} `}
    >
      <section className='flex gap-0 items-center text-lg md:text-2xl text-primary font-medium italic'>
        <Logo />
        CleverDocs
      </section>
      <section className='flex justify-start gap-3 items-center w-full'>
        <div className='flex flex-col md:flex-row gap-1 justify-start md:h-fit '>
          <Link
            href={"https://www.linkedin.com/in/sebastien-savan-76597040/"}
            className='text-sm'
          >
            A propos <span className='mx-1 hidden md:inline'>|</span>
          </Link>
          <Link href={""} className='text-sm'>
            Politique de confidentialité{" "}
            <span className='mx-1 hidden md:inline'>|</span>
          </Link>
          <Link href={""} className='text-sm'>
            Conditions <span className='mx-1 hidden md:inline'>|</span>
          </Link>
          <Link href={""} className='text-sm'>
            Préférences de cookies{" "}
            <span className='mx-1 hidden md:inline'>|</span>
          </Link>
          <Link href={"/contact"} className='text-sm'>
            Nous contacter
          </Link>
        </div>
      </section>
      <section className='text-sm'>
        CleverDocs © 2025 Tous droits réservés.
      </section>
    </footer>
  )
}
