import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts"
import { NextResponse } from "next/server"

// Instancier OpenAI
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { text } = await req.json()

  const prompt = new PromptTemplate({
    template: `Tu es un expert en comptabilité spécialisé dans la gestion financière des artisans (électriciens, plombiers, maçons, etc.).  
Ta mission est d'analyser un document et de déterminer s'il s'agit :  

- **D'une facture client (1)** : Une facture émise par l'artisan pour un travail effectué chez un client. Ce document représente une rentrée d'argent. Il contient souvent des mentions comme **"facture de vente"**, **"client"**, **"montant dû"**, **"prestations fournies"**, ou encore un **nom de client**.  

- **D'un frais (0)** : Une facture correspondant à une dépense pour l'artisan (ex : achat de matériel, location, restaurant, essence, assurances…). Ces documents indiquent généralement un **paiement effectué** par l'artisan et peuvent contenir des termes comme **"facture d'achat"**, **"montant payé"**, **"fournisseur"**, **"TVA déductible"** ou encore une **mention de paiement par carte ou virement**.  

Voici le document à analyser :  

    "{text}"  

Réponds uniquement avec **"1"** si c'est une facture client, ou **"0"** si c'est un frais.  
Ne donne **aucune autre explication**.  
`,
    inputVariables: ["text"],
  })

  const formattedPrompt = await prompt.format({ text })
  const result = await model.generate([[formattedPrompt]])

  const response = result.generations[0][0].text.trim()

  return NextResponse.json({ classification: response })
}
