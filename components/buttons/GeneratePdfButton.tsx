import React, { useState } from "react"
import { Loader2, FileText } from "lucide-react"
import { useTesseract } from "@/hooks/useTesseract"
import { PDFDocument } from "pdf-lib"
import { handleImage, handlePdf } from "@/lib/utils"
import { toast } from "sonner"
import { useGlobalStore } from "@/stores/globalStore"

export function GeneratePdfButton({
  images,
  isGenerated,
  setImages,
}: {
  images: {
    id: string
    file: File
    preview: string
  }[]
  isGenerated: (x: boolean) => void
  setImages: (x: []) => void
}) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { setDocument, isGuest } = useGlobalStore()
  const worker = useTesseract()
  const handleFiles = async () => {
    setIsGenerating(true)
    try {
      const pdfDoc = await PDFDocument.create()
      for (const image of images) {
        await handleImage(image, pdfDoc)
      }

      const pdfBytes = await pdfDoc.save()
      const file = new File([pdfBytes], "nameFile.pdf", {
        type: "application/pdf",
      })
      // @ts-expect-error ignore
      const response = await handlePdf(file, worker, isGuest)

      if (response === "erreur upload") {
        toast("Erreur lors de la generation du PDF", {
          style: {
            backgroundColor: "#c10007",
            color: "#f8fafc",
            padding: "10px",
          },
          position: "top-right",
        })
        return
      }

      setDocument({
        name: response.name,
        // @ts-expect-error ignore
        type: response.type,
        filePath: response.filePath,
      })
      setImages([])
      isGenerated(true)
    } catch (error) {
      toast("An error occurred while generating your PDF. Please try again.")
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }
  return (
    <button
      onClick={handleFiles}
      disabled={isGenerating}
      className='w-5/6 py-4 rounded-2xl font-medium text-card-foreground 
              hover:bg-sky-500 transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2 bg-secondary cursor-pointer'
    >
      {isGenerating ? (
        <>
          <Loader2 className='w-5 h-5 animate-spin' />
          PDF en création...
        </>
      ) : (
        <>
          <FileText className='w-5 h-5' />
          Generer le PDF
        </>
      )}
    </button>
  )
}
