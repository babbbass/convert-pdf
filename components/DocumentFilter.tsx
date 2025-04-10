"use client"
import { useState } from "react"
import { Send, FileDown } from "lucide-react"
import { DeleteDocument } from "@/components/DeleteDocument"
import Image from "next/image"
import { DocumentFilterSelect } from "@/components/DocumentFilterSelect"
import {
  COSTS,
  INVOICE_CUSTOMER,
  ACCOUNTANT,
  DOCUMENT_SENT,
  DOCUMENT_DOWNLOADED,
} from "@/lib/constants"
import { Document } from "@/lib/types"
import { useGlobalStore } from "@/stores/globalStore"
import { EmailForm } from "./EmailForm"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
export function DocumentFilter({ documents }: { documents: Document[] }) {
  const { setDocument } = useGlobalStore()
  const [filter, setFilter] = useState<
    typeof ACCOUNTANT | typeof INVOICE_CUSTOMER | typeof COSTS
  >(ACCOUNTANT)
  const [showForm, setShowForm] = useState(false)

  const filteredDocuments = documents.filter((doc) => {
    if (filter === ACCOUNTANT) return true
    return doc.type === filter
  })

  if (showForm) {
    return (
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className='bg-white rounded-2xl'>
          <DialogTitle className='font-bold text-2xl text-secondary text-center'>
            Envoyez votre PDF
          </DialogTitle>
          <EmailForm onClose={() => setShowForm(true)} />
        </DialogContent>
      </Dialog>
    )
  }

  if (filteredDocuments.length === 0) {
    return (
      <>
        <div className='mb-8 px-4 md:w-4/5 mx-auto'>
          <div className='flex items-center gap-2 justify-center mb-4'>
            <Image src='/pdf.png' width={40} height={40} alt='mes documents' />{" "}
            <h1 className='text-2xl md:text-3xl font-bold'>Mes Fichiers</h1>
          </div>
          <p className='text-center'>
            Retrouvez ici tous les documents que vous avez téléchargés
          </p>
        </div>
        <div className='flex flex-col items-center justify-start text-center pb-10 flex-1 gap-20'>
          <DocumentFilterSelect filter={filter} setFilter={setFilter} />
          <p className='text-lg font-medium'>
            Aucun document trouvé pour ce filtre
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='mb-8 px-4 md:w-4/5 mx-auto'>
        <div className='flex items-center gap-2 justify-center mb-4'>
          <Image src='/pdf.png' width={40} height={40} alt='mes documents' />{" "}
          <h1 className='text-2xl md:text-3xl font-bold'>Mes Fichiers</h1>
        </div>
        <p className='text-center'>
          Retrouvez ici tous les documents que vous avez téléchargés
        </p>
      </div>
      <div className='flex flex-col items-center justify-start text-center pb-10 flex-1 gap-20'>
        <DocumentFilterSelect filter={filter} setFilter={setFilter} />
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
                Statut
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
            {filteredDocuments.map((document) =>
              document.history?.map((history, index: number) => (
                <tr
                  key={`${document.id}-${history.id}`}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {index === 0 ? (
                    <td
                      rowSpan={document.history?.length}
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
                    {history.action === DOCUMENT_SENT ? "Envoyé" : "Téléchargé"}
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
      <div className='md:hidden space-y-4 px-4'>
        {filteredDocuments.map((document) => (
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

            {document.history?.map((history) => (
              <div
                key={history.id}
                className='mb-2 last:mb-0 pb-2 border-b last:border-b-0'
                onClick={() => {
                  if (history.action === DOCUMENT_DOWNLOADED) {
                    setDocument({
                      name: document.name,
                      type: document.type,
                      filePath: document.url,
                    })

                    setShowForm(true)
                  }
                }}
              >
                <div className='flex justify-between'>
                  <span className='font-medium'>Statut:</span>
                  <span className='underline text-secondary'>
                    {history.action === DOCUMENT_SENT ? (
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
                  <span className='underline'>
                    {history.recipient || "N/A"}
                  </span>
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
    </>
  )
}
