"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Questions } from "@/components/Questions"

const FEATURES = [
  {
    title: "Scan intelligent",
    description:
      "Prenez une photo, l'app détecte et convertit automatiquement en PDF.",
  },
  {
    title: "Tri automatique",
    description: "L'IA classe vos documents en factures ou notes de frais.",
  },
  {
    title: "Envoi comptable",
    description:
      "Envoyez vos documents au comptable en un clic ou automatiquement.",
  },
] as const

const PRICING_PLANS = [
  {
    name: "Gratuit",
    price: "0€",
    features: [
      "100 documents/mois",
      "Conversion PDF",
      "Tri automatique",
      "Stockage Drive",
      "Envoil email",
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
  const router = useRouter()
  return (
    <main className='flex flex-col min-h-screen text-gray-800 pt-0 sm:pb-12 bg-secondary'>
      {/* Hero Section */}
      <section className="mx-auto w-full text-center space-y-6 bg-slate-50 px-3 pt-6 md:pt-16 relative after:content-[''] after:absolute after:-bottom-8 after:left-0 after:right-0 after:h-16 after:bg-slate-50 after:rounded-[50%] after:scale-x-110 ">
        <motion.h1
          className='text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl text-primary'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Simplifiez votre comptabilité
        </motion.h1>

        <motion.p
          className='text-base text-primary md:text-xl max-w-3xl mx-auto'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Fini le désordre ! Photos → PDF classés → Envoyés. Simple, non ?
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
            <Link href={"/accueil"}>Essayez gratuitement</Link>
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

      <section className='px-4 bg-slate-50 mt-10'>
        <Questions />
      </section>

      {/* Pricing Section */}
      <section className='my-10 px-4 md:py-10'>
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
            Choisissez le plan qui vous correspond
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
                      onClick={() => {
                        if (plan.featured) {
                          window.location.href = "/accueil"
                        } else {
                          window.location.href = "/accueil"
                        }
                      }}
                    >
                      {plan.featured ? "Commencer" : "Essayer"}
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
