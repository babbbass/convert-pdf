import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PDFDocument } from "pdf-lib"
import { extractTextFromPdf } from "@/lib/extractTextFromPdf"
import { INVOICE_CUSTOMER, COSTS, ACCOUNTANT } from "@/lib/constants"
import { formatDateOfDay } from "./date"
import { storeDocument } from "@/lib/storeDocument"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export async function classifyDocument(textOfDocument: string) {
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

export async function handleImage(
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

export async function handlePdf(
  document: File | Uint8Array<ArrayBufferLike>,
  worker: Worker,
  isGuest: boolean
) {
  let textOfDocument: string | undefined = ""
  try {
    if (!worker) {
      throw new Error("OCR not initialized")
    }
    // @ts-expect-error ignore
    textOfDocument = await extractTextFromPdf(document, worker)
  } catch (error) {
    console.error(error)
  }

  //const { classification } = await classifyDocument(textOfDocument)
  const classification = "1"
  const documentType = generateTypeDocument(Number(classification))
  const documentName = generateNameDocument(documentType)
  const docStored = await storeDocument(
    document,
    documentName,
    classification,
    isGuest
  )
  if (!docStored.success) {
    console.error(docStored)
    return "erreur upload"
  }

  return {
    name: documentName,
    type: documentType,
    filePath: docStored.filePath,
  }
  // setDocument({
  //   name: documentName,
  //   type: documentType,
  //   filePath: docStored.filePath,
  // })
  // setImages([])
  // setIsGenerated(true)
}

export function getAppropriateScale(width: number, height: number) {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  const isPortrait = 0

  const scaleFactor = isPortrait
    ? screenWidth / width / 4
    : screenHeight / height / 4
  return Math.min(scaleFactor, 1)
}
