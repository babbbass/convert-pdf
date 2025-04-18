"use client"
import { useState } from "react"
import { Send, FileDown, Mail } from "lucide-react"
import { DeleteDocument } from "@/components/DeleteDocument"
import Image from "next/image"
import { DocumentFilterSelect } from "@/components/DocumentFilterSelect"
import {
  COSTS,
  INVOICE_CUSTOMER,
  ACCOUNTANT,
  DOCUMENT_SENT,
  DOCUMENT_PER_PAGE,
} from "@/lib/constants"
import { Document } from "@/lib/types"
import { useGlobalStore } from "@/stores/globalStore"
import { EmailForm } from "./EmailForm"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { DisplayDocumentButton } from "./DisplayDocumentButton"
import { Pagination } from "./Pagination"
export function DocumentFilter({ documents }: { documents: Document[] }) {
  const { setDocument, document } = useGlobalStore()
  const router = useRouter()
  const [filter, setFilter] = useState<
    typeof ACCOUNTANT | typeof INVOICE_CUSTOMER | typeof COSTS
  >(ACCOUNTANT)
  const [showDialog, setShowDialog] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [, setStatusFile] = useState<null | string>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredDocuments = documents.filter((doc) => {
    if (filter === ACCOUNTANT) return true
    return doc.type === filter
  })
  // Documents to display
  const indexOfLastDocument = currentPage * DOCUMENT_PER_PAGE
  const indexOfFirstDocument = indexOfLastDocument - DOCUMENT_PER_PAGE
  const currentDocuments = filteredDocuments.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  )
  const totalPages = Math.ceil(filteredDocuments.length / DOCUMENT_PER_PAGE)

  if (showDialog) {
    return (
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogOverlay className='bg-slate-50 fixed inset-0 z-50 backdrop-blur-sm' />
        <DialogContent className='bg-white rounded-2xl flex flex-col pt-10'>
          <DialogTitle className='font-bold text-xl md:text-2xl text-primary text-center mb-10'>
            <span className='text-primary italic'>{document?.name}</span>
          </DialogTitle>
          <div className='flex flex-col gap-4 md:flex-row w-full justify-between text-slate-50'>
            <Button
              className='bg-green-600 hover:bg-green-600/80 rounded-2xl cursor-pointer font-medium'
              onClick={() => {
                setShowForm(true)
                setShowDialog(false)
              }}
            >
              <Mail className='mr-1 h-5 w-5' />
              Envoyer
            </Button>
            <DisplayDocumentButton
              isShowDialog={setShowDialog}
              documentUrl={document?.filePath}
              className='text-sm font-medium'
            />
            <div
              className='font-medium px-4 py-2 bg-red-700 rounded-2xl cursor-pointer hover:bg-red-700/80 whitespace-nowrap overflow-hidden text-ellipsis items-center justify-center flex'
              onClick={() => {
                setShowDialog(false)
              }}
            >
              <DeleteDocument documentId={document?.id} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (showForm) {
    return (
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogOverlay className='bg-slate-50 fixed inset-0 z-50 backdrop-blur-sm' />
        <DialogContent className='bg-white rounded-2xl flex flex-col pt-10'>
          <DialogTitle className='font-bold text-2xl text-secondary text-center mb-6'>
            Envoyer votre PDF
          </DialogTitle>
          <EmailForm
            onClose={() => {
              setShowForm(false)
              router.refresh()
            }}
          />
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
    <div className='flex-1'>
      <div className='mb-8 px-4 md:w-4/5 mx-auto'>
        <div className='flex items-center gap-2 justify-center mb-4'>
          <Image src='/pdf.png' width={40} height={40} alt='mes documents' />{" "}
          <h1 className='text-2xl md:text-3xl font-bold'>Mes Fichiers</h1>
        </div>
        <p className='text-center'>
          Retrouvez ici tous les documents que vous avez téléchargés
        </p>
      </div>
      <div className='flex flex-col items-center justify-start text-center'>
        <DocumentFilterSelect filter={filter} setFilter={setFilter} />
      </div>
      {/* Docs Table Desktop version */}
      <div className='hidden md:block overflow-hidden border shadow-sm rounded-2xl border-secondary mt-2 mb-10 mx-4 transition-all duration-300 ease-in-out p-4 '>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50 sticky top-0 text-primary'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider'
              >
                Document
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
              >
                Statut
              </th>

              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'
              >
                Destinataire
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {currentDocuments.map((document, numLine: number) =>
              document.history?.map((history, index: number) => (
                <tr
                  key={`${document.id}-${history.id}`}
                  className={`cursor-pointer text-slate-500 text-sm hover:bg-secondary hover:text-slate-50 transition-all duration-300 ease-in-out ${
                    numLine % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                  onClick={() => {
                    setDocument({
                      id: document.id,
                      name: document.name,
                      type: document.type,
                      filePath: document.url,
                    })

                    setShowDialog(true)
                    setStatusFile(history.action)
                  }}
                >
                  {index === 0 ? (
                    <td
                      rowSpan={document.history?.length}
                      className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200'
                    >
                      {/* <a
                        href={document.url}
                        className='text-primary hover:underline hover:text-sky-800 transform duration-300 ease-in-out'
                        target='_blank'
                        rel='noopener noreferrer'
                      > */}
                      {document.name}
                      {/* </a> */}
                    </td>
                  ) : null}
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {history.action === DOCUMENT_SENT ? "Envoyé" : "Téléchargé"}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {history.recipient}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
      {/* Mobile version (cards) */}
      <div className='md:hidden space-y-4 px-4 mt-2 mb-10'>
        {filteredDocuments.map((document) => (
          <div
            key={document.id}
            className='border border-secondary rounded-2xl p-4 shadow-sm'
          >
            <div className='mb-3'>
              <a
                href={document.url}
                className='text-lg font-medium text-primary hover:underline hover:text-sky-800 transform duration-300 ease-in-out'
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
                  setDocument({
                    id: document.id,
                    name: document.name,
                    type: document.type,
                    filePath: document.url,
                  })

                  setShowDialog(true)
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
                  <span className='font-medium'>à :</span>
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
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
