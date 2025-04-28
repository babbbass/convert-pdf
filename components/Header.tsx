import { Logo } from "./Logo"
import { Menu } from "./Menu"

export function Header() {
  return (
    <header className='flex bg-slate-50 border-b items-center justify-between md:text-2xl min-h-20 w-full p-2 px-4 sticky top-0 mb-6 md:mb-20 gap-4 border-slate-200'>
      <section className='flex flex-col gap-1'>
        <Logo />
        <p className='text-sm text-secondary font-medium italic'>
          Gestion intelligente des documents
        </p>
      </section>
      <Menu />
    </header>
  )
}
