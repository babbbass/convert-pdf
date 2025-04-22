"use client"
import { useState } from "react"
import Image from "next/image"
import { SendEmailTrigger } from "@/components/SendEmailTrigger"
import { DisplayDocumentButton } from "@/components/DisplayDocumentButton"
import { useGlobalStore } from "@/stores/globalStore"

export function PdfGenerated({
  setImages,
  setIsGenerated,
}: {
  setImages: (x: { id: string; file: File; preview: string }[]) => void
  setIsGenerated: (x: boolean) => void
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { document } = useGlobalStore()
  return (
    <div className='flex flex-col gap-3 items-center justify-center w-5/6'>
      <h3 className='flex flex-col md:flex-row gap-2 items-center justify-center text-lg md:text-2xl font-medium tracking-tight text-primary mb-4 italic'>
        <Image src='/pdf.png' width={40} height={40} alt='mes documents' />
        {document?.name}
      </h3>
      <DisplayDocumentButton
        isShowDialog={setIsDialogOpen}
        documentUrl={document?.filePath}
        className='flex items-center justify-center w-full bg-secondary text-slate-50 px-6 py-4 cursor-pointer border border-secondary rounded-2xl font-medium hover:bg-secondary/80 hover:text-slate-50 transition-all duration-300 hover:border-secondary/80'
      />
      <SendEmailTrigger
        isOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
      <div
        className='flex items-center justify-center w-full bg-primary text-slate-50 px-6 py-4 cursor-pointer border border-primary rounded-2xl font-medium hover:bg-primary/80 hover:text-slate-50 transition-all duration-300 hover:border-primary/80'
        onClick={() => {
          setImages([])
          setIsGenerated(false)
        }}
      >
        {" "}
        Reintialiser
      </div>
    </div>
  )
}
