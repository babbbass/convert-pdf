import React from "react"
import prisma from "@/lib/prisma"
import Image from "next/image"
import { currentUser } from "@clerk/nextjs/server"
import { Send, FileDown } from "lucide-react"
import { DeleteDocument } from "@/components/DeleteDocument"
import Link from "next/link"

export default async function Page() {
  const user = await currentUser()

  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  })
  const documents = await prisma.document.findMany({
    where: { userId: dbUser?.id },
    include: {
      history: {
        orderBy: {
          timestamp: "desc",
        },
      },
    },
  })

  if (documents.length === 0) {
    return (
      <div className='px-4 py-6 flex-1 overflow-x-auto'>
        <div className='flex items-center gap-2 justify-center mb-4'>
          <Image src='/pdf.png' width={40} height={40} alt='mes documents' />{" "}
          <h1 className='text-2xl md:text-3xl font-bold'>Mes Fichiers</h1>
        </div>
        <p className='text-center'>
          Retrouvez ici tous les documents que vous avez téléchargés
        </p>
        <div className=' flex flex-col gap-3 mb-8 px-4 md:w-4/5 mx-auto text-center mt-20 '>
          <span className='text-xl md:2xl font-semibold'>{`Vous n'avez pas encore converti vos documents`}</span>
          <Link
            href={"/"}
            className='text-secondary text-lg hover:underline hover:text-sky-700'
          >
            Commencer
          </Link>
        </div>
      </div>
    )
  }

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
      {/* Desktop version */}
      <div className='hidden md:block overflow-hidden border shadow-sm rounded-2xl border-secondary'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50 sticky top-0'>
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
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-500'>
                    <DeleteDocument documentId={document.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Mobile version (cards) */}
      <div className='md:hidden space-y-4'>
        {documents.map((document) => (
          <div
            key={document.id}
            className='border border-secondary rounded-2xl p-4 shadow-sm'
          >
            <div className='mb-3'>
              <a
                href={document.url}
                className='text-lg font-medium text-secondary hover:underline hover:text-sky-800 transform duration-300 ease-in-out'
                target='_blank'
                rel='noopener noreferrer'
              >
                {document.name}
              </a>
            </div>

            {document.history.map((history) => (
              <div
                key={history.id}
                className='mb-2 last:mb-0 pb-2 border-b last:border-b-0'
              >
                <div className='flex justify-between'>
                  <span className='font-medium'>Action:</span>
                  <span>
                    {history.action === "SENT" ? (
                      <span className='flex items-center'>
                        <Send className='h-4 w-4 mr-1' /> Envoyé
                      </span>
                    ) : (
                      <span className='flex items-center'>
                        <FileDown className='h-4 w-4 mr-1' /> Téléchargé
                      </span>
                    )}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Destinataire:</span>
                  <span>{history.recipient || "N/A"}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Date:</span>
                  <span>
                    {new Date(history.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className='flex justify-end mt-4'>
                  <DeleteDocument documentId={document.id} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
