"use client"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export const InstallPWAButton = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (event: any) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }

    window.addEventListener("beforeinstallprompt", handler)

    // check if the app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      console.log("The user accepted the installation")
      setDeferredPrompt(null)
      setIsInstalled(true)
    } else {
      console.log("The user turned off the installation")
    }
  }

  if (isInstalled) return <p>{`L'application est déjà installée`}</p>

  return (
    <div className='flex justify-center w-full mt-20 md:mt-0'>
      <Button
        onClick={handleInstall}
        className='px-4 py-2 bg-card text-card-foreground rounded-2xl hover:bg-card/80 hover:cursor-pointer transition-all duration-300'
      >
        {`Installer l'application 📲`}
      </Button>
    </div>
  )
}
