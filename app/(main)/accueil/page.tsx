"use client"
import { useState, useCallback, useEffect } from "react"
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
import { storeDocument } from "@/lib/storeDocument"
import { INVOICE_CUSTOMER, COSTS, ACCOUNTANT } from "@/lib/constants"
import { Questions } from "@/components/Questions"
import { DisplayDocumentButton } from "@/components/DisplayDocumentButton"
import Image from "next/image"

export default function Home() {
  const { document, setDocument } = useGlobalStore()
  const worker = useTesseract()
  const [images, setImages] = useState<
    Array<{ id: string; file: File; preview: string }>
  >([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleImagesSelected = useCallback((files: File[]) => {
    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : "/pdf.png",
    }))
    setImages((prev) => [...prev, ...newImages])
    setIsGenerated(false)
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
    const isPortrait = 0

    const scaleFactor = isPortrait
      ? screenWidth / width / 4
      : screenHeight / height / 4
    return Math.min(scaleFactor, 1)
  }

  async function classifyDocument(textOfDocument: string) {
    const res = await fetch("/api/classifyInvoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: textOfDocument }),
    })

    const data = await res.json()
    return data
  }
  // async function extractText(imagePath: string) {
  //   if (!imagePath || typeof imagePath !== "string") {
  //     return
  //   }

  //   const ret = await worker?.recognize(imagePath)
  //   await worker?.terminate()
  //   return ret?.data.text
  // }

  function generateTypeDocument(classification: number) {
    const type =
      classification === 1
        ? INVOICE_CUSTOMER
        : classification === 0
        ? COSTS
        : ACCOUNTANT

    return type
  }
  function generateNameDocument(typeDocument: string) {
    const date = formatDateOfDay()
    const documentName = `${typeDocument}_${date}.pdf`

    return documentName
  }
  async function generatePdf(document: File | Uint8Array<ArrayBufferLike>) {
    let textOfDocument: string | undefined = ""
    try {
      if (!worker) {
        throw new Error("OCR not initialized")
      }
      textOfDocument = await extractTextFromPdf(document, worker)
    } catch (error) {
      console.error(error)
      toast(
        "Une erreur lors de la lecture de votre Document. Veuillez réessayer.",
        {
          style: {
            backgroundColor: "#c10007",
            color: "#f8fafc",
            padding: "10px",
          },
          position: "top-right",
        }
      )
    }

    const { classification } = await classifyDocument(textOfDocument)
    //const classification = "2"
    const documentType = generateTypeDocument(Number(classification))
    const documentName = generateNameDocument(documentType)
    const docStored = await storeDocument(
      document,
      documentName,
      classification
    )
    if (!docStored.success) {
      console.error(docStored)
      return "erreur upload"
    }
    setDocument({
      name: documentName,
      type: documentType,
      filePath: docStored.filePath,
    })
    setImages([])
    setIsGenerated(true)
  }

  async function handleImage(
    image: {
      id: string
      file: File
      preview: string
    },
    pdfDoc: PDFDocument
  ) {
    const imageBytes = await image.file.arrayBuffer()
    if (image.file.type === "application/pdf") {
      const externalPdf = await PDFDocument.load(imageBytes)
      const copiedPages = await pdfDoc.copyPages(
        externalPdf,
        externalPdf.getPageIndices()
      )
      copiedPages.forEach((page) => pdfDoc.addPage(page))
      return
    }

    let pageImage
    if (image.file.type === "image/jpeg" || image.file.type === "image/jpg") {
      pageImage = await pdfDoc.embedJpg(imageBytes)
    } else if (image.file.type === "image/png") {
      pageImage = await pdfDoc.embedPng(imageBytes)
    } else {
      return
    }

    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    const scale = getAppropriateScale(width, height)

    const scaledDims = pageImage.scale(scale)

    page.drawImage(pageImage, {
      x: (width - scaledDims.width) / 2,
      y: (height - scaledDims.height) / 2,
      width: scaledDims.width,
      height: scaledDims.height,
    })

    return page
  }

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
      const response = await generatePdf(file)
      if (response) {
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

      toast("Votre PDF a été généré vous pouvez maintenant l'envoyer. ", {
        style: {
          backgroundColor: "#00a63e",
          color: "#f8fafc",
          padding: "10px",
        },
        position: "top-right",
      })
      setIsGenerated(true)
    } catch (error) {
      toast("An error occurred while generating your PDF. Please try again.")
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    if (images.length < 1) {
      setIsGenerated(false)
    }
  }, [images.length])

  return (
    <div className=' px-4 pb-2 flex-1'>
      <div className='max-w-4xl mx-auto space-y-8 mb-12'>
        <div className='text-base md:text-lg text-center space-y-4'>
          <div className='flex flex-col gap-1'>
            <h1 className='text-2xl md:text-4xl font-bold tracking-tight text-primary'>
              {`Comptabilité 10x plus rapide `}
            </h1>
            <h2 className='text-xl md:text-2xl tracking-tight text-primary mb-4'>{``}</h2>
          </div>
          <ul className='font-medium text-secondary'>
            <li>Classez vos factures ou notes de frais !</li>
            <li>Envoyez les en 2 clics !</li>
          </ul>

          <ul className='flex flex-col md:flex-row gap-1 items-start md:justify-center px-2 md:gap-2 text-sm md:text-base'>
            <li>✅ Cryptage sécurisé</li>
            <li>🔄 Intégration QuickBooks</li>
            <li>⏱️ 3x plus rapide</li>
          </ul>
        </div>
        <ImageUploader onImagesSelected={handleImagesSelected} />
        <div className='space-y-4'>
          <ImageList
            images={images}
            onReorder={handleReorder}
            onRemove={handleRemove}
          />

          <div className='flex flex-col md:flex-row mx-auto gap-3 items-center md:justify-around px-2 mt-10'>
            {isGenerated && (
              <div className='flex flex-col gap-3 items-center justify-center w-5/6'>
                <h3 className='flex flex-col md:flex-row gap-2 items-center justify-center text-lg md:text-2xl font-medium tracking-tight text-primary mb-4 italic'>
                  <Image
                    src='/pdf.png'
                    width={40}
                    height={40}
                    alt='mes documents'
                  />
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
            )}
            {images.length > 0 && (
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
            )}
          </div>
        </div>
      </div>
      <Questions />
    </div>
  )
}
