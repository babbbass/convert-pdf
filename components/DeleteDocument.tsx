"use client"
import { Trash } from "lucide-react"
import { handleDelete } from "@/app/actions"

export function DeleteDocument({
  documentId,
}: {
  documentId: string | undefined
}) {
  return (
    <button
      onClick={() => handleDelete(documentId)}
      className='flex gap-2 items-center text-sm text-error cursor-pointer'
    >
      <Trash className='h-5 w-5 ' />
      Supprimer
    </button>
  )
}
