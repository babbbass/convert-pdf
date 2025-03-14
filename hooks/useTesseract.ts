"use client"
// import { createWorker, Worker as TesseractWorker } from "tesseract.js/legacy";
import { createWorker, Worker as TesseractWorker } from "tesseract.js"
import { useEffect, useState } from "react"

export function useTesseract() {
  const [worker, setWorker] = useState<TesseractWorker>()

  useEffect(() => {
    const initWorker = async () => {
      const newWorker = await createWorker("fra")
      setWorker(newWorker)
    }
    initWorker()

    return () => {
      if (!worker) return
      worker?.terminate()
    }
  }, [])

  return worker
}
