"use client"
import { useState, useCallback } from "react"
import { ImageUploader } from "@/components/ImageUploader"
import { ImageList } from "@/components/ImageList"
import { PDFDocument } from "pdf-lib"
import { toast } from "sonner"
import { reorderedItem } from "@/lib/types"
import { SendEmailTrigger } from "@/components/SendEmailTrigger"
import { extractTextFromPdf } from "@/lib/extractTextFromPdf"
import { FileText, Loader2 } from "lucide-react"
import { useTesseract } from "@/hooks/useTesseract"
import { formatDateOfDay } from "@/lib/date"
import { useGlobalStore } from "@/stores/globalStore"

export default function Home() {
  const { setDocumentName } = useGlobalStore()
  const worker = useTesseract()
  const [images, setImages] = useState<
    Array<{ id: string; file: File; preview: string }>
  >([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const handleImagesSelected = useCallback((files: File[]) => {
    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
    }))
    setImages((prev) => [...prev, ...newImages])
  }, [])

  const handleReorder = useCallback(
    (result: reorderedItem) => {
      if (!result.destination) return

      const items = Array.from(images)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)

      setImages(items)
    },
    [images]
  )

  const handleRemove = useCallback((id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((image) => image.id !== id)
      return filtered
    })
  }, [])

  function getAppropriateScale(width: number, height: number) {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const isPortrait = screenHeight > screenWidth

    if (screenWidth <= 768) {
      const scaleFactor = isPortrait
        ? screenWidth / width / 4
        : screenHeight / height / 4
      return Math.min(scaleFactor, 1) // Limit scale to 1 for avoid image overflow
    }

    return 1
  }

  // function classifyDocument(text: string) {
  //   const factureKeywords = ["facture", "invoice", "TVA", "montant"]
  //   const depenseKeywords = ["ticket", "dépense", "reçu", "note"]

  //   const isFacture = factureKeywords.some((word) =>
  //     text.toLowerCase().includes(word)
  //   )
  //   const isDepense = depenseKeywords.some((word) =>
  //     text.toLowerCase().includes(word)
  //   )

  //   if (isFacture) return "factures"
  //   if (isDepense) return "depenses"
  //   return "inconnu"
  // }
  async function extractText(imagePath: string) {
    if (!imagePath || typeof imagePath !== "string") {
      return
    }
    const ret = await worker?.recognize(imagePath)
    await worker?.terminate()
    return ret?.data.text
  }
  const generatePDF = async () => {
    let textOfDocument: string | undefined = ""
    if (images.length === 0) {
      toast("Please select at least one image to generate a PDF.")
      return
    }

    setIsGenerating(true)
    try {
      const pdfDoc = await PDFDocument.create()
      for (const image of images) {
        if (image.file.type === "application/pdf" && worker) {
          textOfDocument = await extractTextFromPdf(image.file, worker)
        } else {
          textOfDocument = await extractText(image.preview)
        }
        // const res = await fetch("/api/classifyInvoice", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ text: textToDocument }),
        // })
        // const data = await res.json()
        // const classifyDoc = classifyDocument(textToDocument)
        console.log("textImage", textOfDocument)
        const imageBytes = await image.file.arrayBuffer()
        let pageImage
        // if image
        if (
          image.file.type === "image/jpeg" ||
          image.file.type === "image/jpg"
        ) {
          pageImage = await pdfDoc.embedJpg(imageBytes)
        } else if (image.file.type === "image/png") {
          pageImage = await pdfDoc.embedPng(imageBytes)
        } else {
          continue
        }

        const page = pdfDoc.addPage()
        const { width, height } = page.getSize()

        const scale = getAppropriateScale(width, height)
        const scaledDims = pageImage.scale(scale)
        console.log("scaledDims", scaledDims)

        page.drawImage(pageImage, {
          x: (width - scaledDims.width) / 2,
          y: (height - scaledDims.height) / 2,
          width: scaledDims.width,
          height: scaledDims.height,
        })
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const date = formatDateOfDay()
      setDocumentName(`${date}.pdf`)
      const file = new File([pdfBytes], `${date}.pdf`, {
        type: "application/pdf",
      })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = "document.pdf"
      // link.click()
      const formData = new FormData()
      formData.append("file", file)
      formData.append("classification", "1")
      await fetch("/api/stockFile", {
        method: "POST",
        body: formData,
      })
      //storePDF(pdfDoc, "test", data.classification)
      setIsGenerated(true)
      toast("Your PDF has been generated and downloaded.")
    } catch (error) {
      toast("An error occurred while generating your PDF. Please try again.")
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className='bg-gradient-to-b from-white to-gray-50 px-4 py-8 flex-1'>
      <div className='max-w-4xl mx-auto space-y-8'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold tracking-tight text-primary'>
            Envoyez vos documents
          </h1>
          <p className='text-lg text-sky-500'>
            Convertissez vos photos en document PDF et envoyez les en quelques
            secondes
          </p>
        </div>
        <ImageUploader onImagesSelected={handleImagesSelected} />
        <div className='space-y-4'>
          <ImageList
            images={images}
            onReorder={handleReorder}
            onRemove={handleRemove}
          />

          {images.length > 0 && (
            <div className='flex flex-col md:flex-row mx-auto gap-3 items-center md:justify-around px-2 mt-10'>
              <button
                onClick={generatePDF}
                disabled={isGenerating}
                className='glass w-3/4 py-4 rounded-2xl font-medium text-card-foreground 
                hover:bg-sky-500 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 bg-sky-400 cursor-pointer'
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
              {isGenerated && (
                <div className='flex justify-end'>
                  <SendEmailTrigger />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
