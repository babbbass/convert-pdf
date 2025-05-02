"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Questions } from "@/components/Questions"
import { ImageUploader } from "@/components/ImageUploader"
import { ImageList } from "@/components/ImageList"
import { useState, useCallback, useEffect } from "react"
import { reorderedItem } from "@/lib/types"
import { useGlobalStore } from "@/stores/globalStore"
import Image from "next/image"
import { LandingEmailTrigger } from "@/components/LandingEmailTrigger"
import { GeneratePdfButton } from "@/components/buttons/GeneratePdfButton"
import { HeaderLanding } from "@/components/HeaderLanding"
import { useAuth } from "@clerk/nextjs"

const FEATURES = [
  {
    title: "Scan intelligent en PDF",
    description:
      "Prenez une photo ou importez un scan. L'app détecte, optimise et convertit instantanément en PDF clair et professionnel.",
  },
  {
    title: "Tri Automatique par IA",
    description:
      "Plus de tri manuel ! Notre IA classe intelligemment vos documents : Facture, Note de frais ou autre justificatif comptable.",
  },
  {
    title: "Envoi Facile et Rapide",
    description:
      "Transmettez vos documents PDF organisés à votre comptable (ou qui vous voulez) en quelques clics. Clôturez vos comptes plus vite.",
  },
] as const

const PRICING_PLANS = [
  {
    name: "Plan Gratuit",
    price: "0€",
    features: [
      "100 documents stockés / mois",
      "Conversion Image / Scan en PDF",
      "Tri Automatique (Factures / Notes de frais)",
      "Stockage Sécurisé de vos documents",
      "Envoi facile par email",
      "Accès depuis n'importe quel appareil",
    ],
    featured: true,
  },
  // {
  //   name: "Standard",
  //   price: "9,99€/mois",
  //   features: ["100 docs/mois", "Tri automatique", "Envoi comptable"],
  //   featured: true,
  // },
  // {
  //   name: "Premium",
  //   price: "19,99€/mois",
  //   features: ["Illimité", "Export Drive/Email", "Support prioritaire"],
  //   featured: false,
  // },
] as const

export default function LandingPage() {
  const { userId, isLoaded } = useAuth()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  const [isSended, setIsSended] = useState(false)
  const { document } = useGlobalStore()
  const [images, setImages] = useState<
    Array<{ id: string; file: File; preview: string }>
  >([])
  const [isGenerated, setIsGenerated] = useState(false)

  useEffect(() => {
    if (isLoaded && userId && !isRedirecting) {
      setIsRedirecting(true)
      // replace no keep in navigator history
      router.replace("/accueil")
    }
  }, [isLoaded, userId, router, isRedirecting])

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

  if (!isLoaded) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-secondary text-slate-50 p-4'>
        <div
          className='animate-spin rounded-full h-12 w-12 border-4 border-solid border-slate-50 border-t-slate-300 mb-4'
          role='status'
          aria-live='polite'
          aria-label='Chargement en cours'
        >
          <span className='sr-only'>Chargement...</span>{" "}
        </div>
        <p className='mt-4 text-lg font-medium'>Chargement...</p>
      </div>
    )
  }

  if (isRedirecting) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-secondary text-slate-50 p-4 text-center'>
        <div
          className='animate-spin rounded-full h-16 w-16 border-4 border-solid border-slate-300/50 border-t-slate-50 mb-4'
          role='status'
          aria-live='polite'
          aria-label='Redirection en cours'
        >
          <span className='sr-only'>Redirection...</span>
        </div>
        <p className='text-xl font-semibold'>
          Vous êtes connecté. Redirection vers votre espace en cours...
        </p>
      </div>
    )
  }
  return (
    <main className='flex flex-col min-h-screen text-gray-800 pt-0 sm:pb-12 bg-secondary overflow-x-hidden'>
      <section className='bg-slate-50 z-50 p-0'>
        <HeaderLanding />
      </section>
      {/* Hero Section */}
      <section className="w-full text-center space-y-6 bg-slate-50 px-3 pt-6 md:pt-16 relative after:content-[''] after:absolute after:-bottom-8 after:left-0 after:right-0 after:h-16 after:bg-slate-50 after:rounded-[50%] after:scale-x-110">
        <motion.h1
          className='text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl text-primary italic'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Transformez Vos Reçus en Compta Simplifiée
        </motion.h1>

        <motion.p
          className='text-base text-primary md:text-xl max-w-3xl mx-auto text-left'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {`Fatigué de perdre du temps avec les reçus papier ? Prenez une photo, notre application convertit, classe vos factures/notes de frais et les prépare pour l'envoi. Gagnez du temps et de la sérénité.`}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button
            size='lg'
            className='text-base rounded-2xl hover:shadow-xl transition-shadow bg-secondary text-card-foreground hover:bg-secondary/90 cursor-pointer relative z-10'
          >
            <Link href={"/accueil"}>
              Tester Gratuitement Maintenant (Sans CB)
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className='mt-16 sm:mt-20 lg:mt-24 md:py-10'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card className='h-full rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-slate-50'>
                  <CardContent className='p-6'>
                    <CheckCircle className='text-green-700 mb-4' size={32} />
                    <h3 className='text-xl font-semibold mb-2 text-primary'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-600'>{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Section */}
      <section className='mt-10  p-10 md:p-20 bg-slate-50 pb-14 '>
        <div className='flex gap-6 flex-col max-w-6xl mx-auto w-full'>
          {!isSended && (
            <>
              <h2 className='text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-primary text-center italic'>
                Voyez la Magie Opérer : Testez Sans Compte Requis ! 👇
              </h2>
              <ImageUploader onImagesSelected={handleImagesSelected} />
              <ImageList
                images={images}
                onReorder={handleReorder}
                onRemove={handleRemove}
              />
              {images.length > 0 && (
                <div className='flex justify-center'>
                  <GeneratePdfButton
                    images={images}
                    isGenerated={setIsGenerated}
                    setImages={setImages}
                  />
                </div>
              )}
            </>
          )}

          {isGenerated && (
            <div className='flex flex-col gap-4 items-center justify-center'>
              <h3 className='flex flex-col md:flex-row gap-2 items-center justify-center text-lg md:text-2xl font-medium tracking-tight text-primary mb-4 italic'>
                Votre PDF est prêt :
                <Image
                  src='/pdf.png'
                  width={40}
                  height={40}
                  alt='mes documents'
                />
                {document?.name}
              </h3>
              <div className='flex flex-col gap-4 items-center justify-center'>
                {isSended ? (
                  <h2 className='text-lg font-bold tracking-tight sm:text-2xl md:text-3xl text-secondary text-center'>
                    Parfait ! Votre document PDF de test a été envoyé avec
                    succès.
                  </h2>
                ) : (
                  <LandingEmailTrigger
                    setIsSended={setIsSended}
                    isSended={isSended}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      <section className='px-4 bg-slate-50 mt-0'>
        <Questions />
      </section>

      {/* Pricing Section */}
      <section className='my-10 px-4 md:py-10 '>
        <div className='max-w-5xl mx-auto text-center space-y-4'>
          <motion.h2
            className='text-3xl font-bold tracking-tight sm:text-4xl text-slate-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Tarification simple et transparente
          </motion.h2>

          <motion.p
            className='text-slate-100 max-w-2xl mx-auto'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {`Démarrez gratuitement dès aujourd'hui. Aucune carte bancaire requise.`}
          </motion.p>

          <div className='grid gap-6 sm:grid-cols-1 lg:grid-cols-1 mt-8'>
            {PRICING_PLANS.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card
                  className={`h-full rounded-2xl cursor-pointer bg-slate-50 text-primary md:w-1/2 mx-auto ${
                    plan.featured ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => {
                    router.push("/accueil")
                  }}
                >
                  <CardHeader>
                    <CardTitle className='text-2xl font-bold'>
                      {plan.name}
                    </CardTitle>
                    <p className='text-xl text-green-700'>{plan.price}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className='space-y-3'>
                      {plan.features.map((feature, i) => (
                        <li key={i} className='flex items-start gap-3'>
                          <CheckCircle
                            className='text-green-700 mt-0.5 flex-shrink-0'
                            size={18}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      size='lg'
                      className={`w-full mt-6 ${
                        plan.featured
                          ? "bg-secondary text-slate-50 hover:bg-secondary/90 cursor-pointer"
                          : "bg-secondary text-slate-50 hover:bg-secondary/90 cursor-pointer"
                      }`}
                      asChild
                    >
                      <Link href='/accueil'>
                        {plan.featured ? "Créer mon Compte Gratuit" : "Essayer"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer className='max-w-6xl mx-auto border-t-0 md:border-t-1 text-slate-50' />
    </main>
  )
}
