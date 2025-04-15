"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
    features: ["5 documents/mois", "Conversion PDF", "Support email"],
    featured: false,
  },
  {
    name: "Standard",
    price: "9,99€/mois",
    features: ["100 docs/mois", "Tri automatique", "Envoi comptable"],
    featured: true,
  },
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
    <main className='min-h-screen bg-white text-gray-800 px-4 py-8 sm:px-6 sm:py-12'>
      {/* Hero Section */}
      <section className='max-w-5xl mx-auto text-center space-y-6'>
        <motion.h1
          className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Simplifiez votre comptabilité
        </motion.h1>

        <motion.p
          className='text-lg text-gray-600 md:text-xl max-w-3xl mx-auto'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Convertissez vos photos en PDF, classez-les automatiquement et
          envoyez-les à votre comptable en 2 clic.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button
            size='lg'
            className='text-lg rounded-2xl shadow-lg hover:shadow-xl transition-shadow bg-secondary text-slate-50 hover:bg-secondary/90 cursor-pointer'
          >
            <Link href={"/accueil"}>Essayez gratuitement</Link>
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className='mt-16 sm:mt-20 lg:mt-24'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card className='h-full rounded-2xl shadow-sm hover:shadow-md transition-shadow'>
                  <CardContent className='p-6'>
                    <CheckCircle className='text-green-700 mb-4' size={32} />
                    <h3 className='text-xl font-semibold mb-2'>
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

      {/* Pricing Section */}
      <section className='mt-16 sm:mt-20 lg:mt-24'>
        <div className='max-w-5xl mx-auto text-center space-y-4'>
          <motion.h2
            className='text-3xl font-bold tracking-tight sm:text-4xl'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Tarification simple et transparente
          </motion.h2>

          <motion.p
            className='text-gray-600 max-w-2xl mx-auto'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Choisissez le plan qui vous correspond
          </motion.p>

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-8'>
            {PRICING_PLANS.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card
                  className={`h-full rounded-2xl cursor-pointer ${
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
                          ? "cursor-pointer"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
                      }`}
                      onClick={() => {
                        if (plan.featured) {
                          //   fetch(process.env.LEMONSQUEEZY_CHECKOUT as string, {})
                          //     .then((res) => res.json())
                          //     .then((data) => {
                          //       if (data?.url) window.location.href = data.url
                          //     })
                          // window.location.href = process.env
                          //   .NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT as string
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
      <Footer />
    </main>
  )
}
