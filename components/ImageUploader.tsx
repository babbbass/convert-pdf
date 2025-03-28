import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { ImageIcon, UploadIcon } from "lucide-react"
import { Card } from "./ui/card"
import { toast } from "sonner"

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void
}

export const ImageUploader = ({ onImagesSelected }: ImageUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onImagesSelected(acceptedFiles)
    },
    [onImagesSelected]
  )

  const onDropRejected = () => {
    toast(
      "Format de fichier non supporté. Veuillez choisir une image ou un PDF.",
      {
        style: {
          backgroundColor: "#fd9a00",
          color: "#f8fafc",
          padding: "10px",
        },
        position: "top-right",
      }
    )
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".heic", ".webp"],
      "application/pdf": [".pdf"],
    },
    multiple: true,
  })

  return (
    <Card
      {...getRootProps()}
      className={`glass p-8 rounded-xl text-center cursor-pointer transition-all duration-200 
        ${
          isDragActive
            ? "border-slate-50 border-2"
            : "border border-dashed border-slate-50"
        }
        hover:border-slate-50 hover:border-solid bg-card`}
    >
      <input {...getInputProps()} />
      <div className='flex flex-col items-center gap-4'>
        {isDragActive ? (
          <ImageIcon className='w-12 h-12 text-card-foreground animate-bounce' />
        ) : (
          <UploadIcon className='w-12 h-12 text-card-foreground' />
        )}
        <div>
          <p className='text-lg font-medium'>
            {isDragActive
              ? "Déposez les images ici"
              : "Glissez et déposez les images ici"}
          </p>
          <p className='text-sm text-card-foreground mt-1'>
            ou cliquez pour sélectionner les fichiers
          </p>
        </div>
      </div>
    </Card>
  )
}
