import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

export function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='max-w-6xl overflow-x-hidden flex flex-col mx-auto h-screen min-w-[280px] md:min-w-3xl bg-gradient-to-b from-slate-50 to-slate-50'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
