import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Questions() {
  return (
    <div className='flex flex-col items-center justify-center px-2 md:mt-20 mb-10'>
      <h3 className='text-2xl md:text-3xl font-bold tracking-tight text-primary mb-4'>
        Questions fréquentes
      </h3>
      <Accordion type='single' collapsible className='w-full md:w-3/4'>
        <AccordionItem
          value='question-1'
          className='transition-all duration-300 ease-in-out'
        >
          <AccordionTrigger className='transition-all duration-300 ease-in-out'>
            Comment ça marche ?
          </AccordionTrigger>
          <AccordionContent
            className='transition-all duration-700 ease-in-out data-[state=closed]:animate-accordion-up 
                              data-[state=open]:animate-accordion-down text-gray-500 font-medium'
          >
            Glissez-déposez vos factures ou notes de frais (photo, PDF, JPEG),
            et nous les convertissons en PDF organisé en quelques secondes.
            Envoyez-le directement à votre comptable depuis l’appli !
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='question-2'>
          <AccordionTrigger>
            Puis-je envoyer plusieurs documents à la fois ?
          </AccordionTrigger>
          <AccordionContent className='text-gray-500 font-medium'>
            Oui ! Fusionnez jusqu’à 10 fichiers par lot (photos, scans, etc.) en
            un seul PDF clair, parfait pour vos déclarations mensuelles.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='question-3'>
          <AccordionTrigger>
            Mes données sont-elles sécurisées ?
          </AccordionTrigger>
          <AccordionContent className='text-gray-500 font-medium'>
            Absolument. Nous utilisons un chiffrement de type [SSL/Bank-grade],
            et vos documents sont supprimés automatiquement sous 24h après
            traitement.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='question-4'>
          <AccordionTrigger className='duration-300'>
            Ça marche avec quels formats ?
          </AccordionTrigger>
          <AccordionContent className='text-gray-500 font-medium'>
            Photos (JPEG/PNG/webp), scans, PDFs, et même captures d’écran. Nous
            les retravaillons pour qu’ils soient lisibles et professionnels.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='question-5' className='duration-300'>
          <AccordionTrigger className='duration-300'>
            Je suis débutant, est-ce facile à utiliser ?
          </AccordionTrigger>
          <AccordionContent className='text-gray-500 font-medium'>
            Aucun logiciel à installer. Conçu pour les solopreneurs : interface
            ultra-simple, tutoriaux en 1 clic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='question-6' className='last:border-b'>
          <AccordionTrigger>
            {`Comment j' envoie le PDF à mon comptable ?`}
          </AccordionTrigger>
          <AccordionContent className='text-gray-500 font-medium'>
            Par email directement depuis l’appli, ou lien partageable sécurisé.
            Vous pouvez aussi le sauvegarder sur votre drive.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
