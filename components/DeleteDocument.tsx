"use client"
import { Trash } from "lucide-react"
import { handleDelete } from "@/app/actions"

export function DeleteDocument({ documentId }: { documentId: string }) {
  return (
    <button onClick={() => handleDelete(documentId)}>
      <Trash className='h-5 w-5 text-error cursor-pointer' />
    </button>
  )
}
