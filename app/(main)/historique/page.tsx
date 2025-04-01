import React from "react"
import prisma from "@/lib/prisma"
import Image from "next/image"

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
    <div className='px-4 py-6 flex-1 overflow-x-auto'>
      <div className='mb-8 px-4 md:w-4/5 mx-auto'>
        <div className='flex items-center gap-2 justify-center mb-4'>
          <Image src='/pdf.png' width={40} height={40} alt='mes documents' />{" "}
          <h1 className='text-2xl md:text-3xl font-bold'>Mes Fichiers</h1>
        </div>
        <p className='text-center'>
          Retrouvez ici tous les documents que vous avez téléchargés
        </p>
      </div>
      <div className='overflow-hidden border shadow-sm rounded-2xl  border-secondary'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Document
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Action
              </th>

              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Destinataire
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {documents.map((document) =>
              document.history.map((history, index) => (
                <tr
                  key={`${document.id}-${history.id}`}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {index === 0 ? (
                    <td
                      rowSpan={document.history.length}
                      className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200'
                    >
                      <a
                        href={document.url}
                        className='text-secondary hover:underline hover:text-sky-800 transform duration-300 ease-in-out'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {document.name}
                      </a>
                    </td>
                  ) : null}
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-500'>
                    {history.action === "SENT" ? "Envoyé" : "Téléchargé"}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-500'>
                    {history.recipient}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
