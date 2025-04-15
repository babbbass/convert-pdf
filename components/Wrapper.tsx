import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

export function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='overflow-x-hidden flex flex-col mx-auto flex-1 min-w-[280px] md:min-w-3xl bg-gradient-to-b from-slate-50 to-slate-50'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
