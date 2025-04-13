import { Eye } from "lucide-react"
export function DisplayDocumentButton({
  isShowDialog,
  documentUrl,
  className,
}: {
  isShowDialog: (x: boolean) => void
  documentUrl: string | undefined
  className?: string
}) {
  return (
    <div
      className={`flex items-center justify-center gap-2 font-semibold px-4 py-2 text-sm bg-secondary rounded-2xl cursor-pointer hover:bg-secondary/80 ${className}`}
      onClick={() => isShowDialog(false)}
    >
      <a
        href={documentUrl}
        target='_blank'
        className='flex whitespace-nowrap overflow-hidden text-ellipsis items-center'
      >
        <Eye className='mr-2 h-5 w-5' /> Voir le PDF
      </a>
    </div>
  )
}
