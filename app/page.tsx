"use client"
import { useState, useCallback } from "react"
import { ImageUploader } from "@/components/ImageUploader"
import { ImageList } from "@/components/ImageList"
import { FileText, Loader2 } from "lucide-react"
import { PDFDocument } from "pdf-lib"
import { toast } from "sonner"
import { reorderedItem } from "@/lib/types"
import { createWorker } from "tesseract.js"
import { extractTextFromPdf } from "@/lib/convertPdf"

export default function Home() {
  const [images, setImages] = useState<
    Array<{ id: string; file: File; preview: string }>
  >([])
  const [isGenerating, setIsGenerating] = useState(false)

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

    // for mobile
    if (screenWidth <= 768) {
      const scaleFactor = isPortrait
        ? screenWidth / width / 4
        : screenHeight / height / 4
      return Math.min(scaleFactor, 1) // Limit scale to 1 for avoid image overflow
    }
    return 1
  }

  async function extractText(imagePath: string) {
    const worker = await createWorker("fra")
    console.log("regonizing", imagePath)
    const ret = await worker.recognize(imagePath)
    console.log("grrr", ret.data.text)
    await worker.terminate()
    return ret.data.text
  }

  function classifyDocument(text: string) {
    const factureKeywords = ["facture", "invoice", "TVA", "montant"]
    const depenseKeywords = ["ticket", "dépense", "reçu", "note"]

    const isFacture = factureKeywords.some((word) =>
      text.toLowerCase().includes(word)
    )
    const isDepense = depenseKeywords.some((word) =>
      text.toLowerCase().includes(word)
    )

    if (isFacture) return "factures"
    if (isDepense) return "depenses"
    return "inconnu"
  }

  const generatePDF = async () => {
    let textToDocument = ""
    if (images.length === 0) {
      toast("Please select at least one image to generate a PDF.")
      return
    }

    setIsGenerating(true)
    try {
      const pdfDoc = await PDFDocument.create()
      // const img = images[0]
      console.log(images)
      // return
      for (const image of images) {
        if (image.file.type === "application/pdf") {
          textToDocument = await extractTextFromPdf(image.file)
        } else {
          textToDocument = await extractText(image.preview)
        }
        // const textImage = await extractText(image.preview)
        const classifyDoc = classifyDocument(textToDocument)
        console.log("textImage", classifyDoc)
        return
        const imageBytes = await image.file.arrayBuffer()
        let pageImage

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
        console.log(width, height)
        const scale = getAppropriateScale(width, height)
        const scaledDims = pageImage.scale(scale)

        page.drawImage(pageImage, {
          x: (width - scaledDims.width) / 2,
          y: (height - scaledDims.height) / 2,
          width: scaledDims.width,
          height: scaledDims.height,
        })
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = "document.pdf"
      link.click()

      toast("Your PDF has been generated and downloaded.")
    } catch (error) {
      toast("An error occurred while generating your PDF. Please try again.")
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold tracking-tight'>
            Photo PDF Convert
          </h1>
          <p className='text-lg text-gray-600'>
            Convert your photos into a beautiful PDF document in seconds
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
            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className='glass w-full py-4 rounded-lg font-medium text-primary 
                hover:bg-slate-300 hover:text-slate-900 transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 bg-primary text-white cursor-pointer'
            >
              {isGenerating ? (
                <>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  Generating PDF...
                </>
              ) : (
                <>
                  <FileText className='w-5 h-5' />
                  Generate PDF
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
