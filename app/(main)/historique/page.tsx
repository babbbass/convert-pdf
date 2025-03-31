import React from "react"
import prisma from "@/lib/prisma"

export default async function page() {
  const documents = await prisma.document.findMany({
    include: {
      history: {
        orderBy: {
          timestamp: "desc",
        },
      },
    },
  })
  return (
    <div className='px-4 py-6 flex-1'>
      <h1 className='text-2xl font-bold text-center mb-12'>Mon historique</h1>
      {documents.map((document) => (
        <div key={document.id}>
          <h2>{document.name}</h2>
          {document.history.map((history) => (
            <div key={history.id}>
              <p>{history.action}</p>
              <p>{history.senderId}</p>
              <p>{history.recipient}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
