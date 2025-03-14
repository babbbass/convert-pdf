import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='bg-gradient-to-b from-slate-50 to-slate-100 px-2 flex flex-col mx-auto flex-1 min-w-[280px] md:min-w-3xl'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
