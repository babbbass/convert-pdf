import * as pdfjs from "pdfjs-dist"
import { Worker } from "tesseract.js"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`

export async function extractTextFromPdf(
  pdfFile: File | ArrayBuffer | Uint8Array<ArrayBufferLike> | Buffer,
  worker: Worker,
  options: {
    language?: string
    pageRange?: { start: number; end?: number }
    onProgress?: (progress: {
      page: number
      totalPages: number
      percent: number
    }) => void
  } = {}
): Promise<string> {
  const {
    pageRange = { start: 1 },
    // onProgress = () => {},
  } = options

  // Convert file in arrayBuffer if necessary
  const arrayBuffer =
    pdfFile instanceof File ? await pdfFile.arrayBuffer() : pdfFile

  const loadingTask = pdfjs.getDocument({ data: arrayBuffer })
  const pdf = await loadingTask.promise

  const totalPages = pdf.numPages
  const startPage = Math.max(1, pageRange.start)
  const endPage = pageRange.end
    ? Math.min(totalPages, pageRange.end)
    : totalPages

  let fullText = ""
  for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
    // onProgress({
    //   page: pageNum,
    //   totalPages: endPage - startPage + 1,
    //   percent: Math.round(
    //     ((pageNum - startPage) / (endPage - startPage + 1)) * 100
    //   ),
    // })

    const page = await pdf.getPage(pageNum)

    const viewport = page.getViewport({ scale: 1.5 }) // Échelle plus grande pour une meilleure qualité
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    if (!context) {
      throw new Error("Impossible de créer le contexte du canvas")
    }

    canvas.height = viewport.height
    canvas.width = viewport.width

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise

    // Extract text with Tesseract
    if (worker) {
      const {
        data: { text },
      } = await worker.recognize(canvas)
      fullText += text + "\n\n"
    }
  }

  return fullText.trim()
}

export async function extractTextFromPdfServer(
  pdfBuffer: Buffer,
  options: {
    pageRange?: { start: number; end?: number }
  } = {}
): Promise<string> {
  const { pageRange = { start: 1 } } = options

  const loadingTask = pdfjs.getDocument({ data: pdfBuffer })
  const pdf = await loadingTask.promise

  const totalPages = pdf.numPages
  const startPage = Math.max(1, pageRange.start)
  const endPage = pageRange.end
    ? Math.min(totalPages, pageRange.end)
    : totalPages

  let fullText = ""

  for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
    const page = await pdf.getPage(pageNum)

    const content = await page.getTextContent()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageText = content.items.map((item: any) => item.str).join(" ")

    fullText += pageText + "\n\n"
  }

  return fullText.trim()
}
