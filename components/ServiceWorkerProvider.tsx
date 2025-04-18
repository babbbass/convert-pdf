"use client"
import { useEffect } from "react"

export function ServiceWorkerProvider() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => {
          console.log("Service Worker enregistré avec succès ✅")
        })
        .catch((error) =>
          console.error("Erreur lors de l'enregistrement du SW:", error)
        )
    }
  }, [])

  return null
}
