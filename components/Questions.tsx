import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ_ITEMS = [
  {
    question: "Comment fonctionne l'application exactement ?",
    answer: `C'est simple ! Prenez une photo ou glissez-déposez vos fichiers
            (images, scans, PDF). Notre application convertit tout en un PDF
            clair et optimisé, le classe automatiquement (facture, note de
            frais...) et le stocke de manière sécurisée. Vous pouvez ensuite
            l'envoyer facilement à votre comptable ou le télécharger.`,
  },
  {
    question: "Puis-je combiner plusieurs images en un seul PDF ?",
    answer: `Absolument ! Vous pouvez sélectionner plusieurs images ou fichiers
            (jusqu’à 10 par traitement) et les fusionner automatiquement en un
            seul document PDF multi-pages. Parfait pour regrouper tous vos
            justificatifs d'un mois, par exemple.`,
  },
  {
    question: "Mes documents et données sont-ils en sécurité ?",
    answer: `La sécurité est notre priorité absolue. Vos documents sont chiffrés
            (AES-256) lors du transfert et au repos sur des serveurs sécurisés en Europe.
            Nous utilisons
            l'infrastructure sécurisée de Amazon Web Services pour le stockage et Clerk
            pour une authentification robuste. Vous seul contrôlez l'accès et la
            gestion de vos documents.`,
  },
  {
    question: "Quels types de fichiers puis-je importer ?",
    answer: `Nous acceptons une large gamme de formats : images courantes (JPEG,
            PNG, WEBP, HEIC), documents scannés, PDF existants et même captures
            d'écran. Notre système les optimise pour garantir une lisibilité
            maximale dans le PDF final.`,
  },
  {
    question: `Est-ce compliqué à utiliser si je ne suis pas à l'aise avec la tech
            ?`,
    answer: `Pas du tout ! L'application est conçue pour être extrêmement simple
            et intuitive. Aucune installation requise, tout se passe en ligne.
            En quelques clics, vos documents sont prêts. Idéal pour les
            indépendants et petites entreprises qui veulent gagner du temps.`,
  },
  // {
  //   question: "Comment puis-je transmettre le PDF final à mon comptable ?",
  //   answer:
  //     "Plusieurs options s'offrent à vous:\n - Envoyez-le directement par email depuis l'application.\n -  Téléchargez simplement le fichier PDF sur votre ordinateur ou sur votre Google Drive.",
  // },
]

export function Questions() {
  return (
    <div
      id='faq'
      className='flex flex-col items-center justify-center px-4 md:px-6 py-2 md:py-16 max-w-4xl mx-auto w-full'
    >
      <h3 className='text-2xl md:text-4xl font-bold tracking-tight text-primary mb-6 md:mb-8 text-center'>
        Vos Questions, Nos Réponses
      </h3>
      <Accordion
        type='single'
        collapsible
        className='w-full'
        aria-label='Foire aux questions'
      >
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem
            key={`question-${index}`}
            value={`item-${index}`}
            className={index === FAQ_ITEMS.length - 1 ? "last:border-b-0" : ""}
          >
            <AccordionTrigger
              className='text-left font-semibold hover:no-underline'
              aria-controls={`accordion-content-${index}`}
              id={`accordion-header-${index}`}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent
              className='text-gray-600 dark:text-gray-300'
              id={`accordion-content-${index}`}
              aria-labelledby={`accordion-header-${index}`}
              role='region'
            >
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
