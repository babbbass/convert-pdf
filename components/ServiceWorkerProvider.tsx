"use client"
import { useEffect } from "react"

export function ServiceWorkerProvider() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker enregistré avec succès ✅", registration)
        })
        .catch((error) =>
          console.error("Erreur lors de l'enregistrement du SW:", error)
        )
    }
  }, [])

  return null
}
