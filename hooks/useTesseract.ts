"use client"
import { createWorker, Worker as TesseractWorker } from "tesseract.js"
import { useEffect, useState } from "react"

export function useTesseract() {
  const [worker, setWorker] = useState<TesseractWorker | null>(null)

  useEffect(() => {
    const initWorker = async () => {
      const newWorker = await createWorker("fra")
      setWorker(newWorker)
    }
    initWorker()

    return () => {
      if (worker) {
        worker.terminate()
      }
    }
  }, [worker])

  return worker
}

// export async function extractText(imagePath: string) {
//   const worker = await createWorker("fra")
//   const ret = await worker.recognize(imagePath)
//   await worker.terminate()
//   return ret.data.text
// }
