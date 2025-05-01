import { Logo } from "./Logo"
import { Menu } from "./Menu"

export function Header() {
  return (
    <header className='flex bg-slate-50 items-center justify-between md:text-2xl min-h-16 w-full p-2 px-4 sticky top-0 mb-2 md:mb-20 gap-4 border-slate-200'>
      <section className='flex flex-col gap-1'>
        <Logo />
        {/* <p className='text-sm text-secondary font-medium italic'>
          Gestion intelligente des documents
        </p> */}
      </section>
      <Menu />
    </header>
  )
}
