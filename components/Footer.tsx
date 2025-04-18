import Link from "next/link"
import { Logo } from "./Logo"

export function Footer() {
  return (
    <footer className='flex flex-col mt-auto items-start justify-between md:text-2xl min-h-24 w-full p-2 px-4 border-t gap-3 border-slate-200 text-gray-500'>
      <section>
        <Logo />
      </section>
      <section className='flex justify-start gap-3 items-center w-full'>
        <div className='flex flex-col md:flex-row gap-1 justify-start md:h-fit '>
          <Link href={""} className='text-sm'>
            Politique de confidentialité{" "}
            <span className='mx-1 hidden md:inline'>|</span>
          </Link>
          <Link href={""} className='text-sm'>
            Conditions <span className='mx-1 hidden md:inline'>|</span>
          </Link>
          <Link href={""} className='text-sm'>
            Préférences de cookies
          </Link>
        </div>
      </section>
      <section className='text-sm'>
        © 2025 CleverDocs by PDF Technologies, pixeloft Company.
      </section>
    </footer>
  )
}
