import { GripVertical, X } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import invariant from "tiny-invariant"
import { reorderedItem } from "@/lib/types"

export function Picture({
  image,
  onReorder,
  onRemove,
  index,
}: {
  image: { id: string; file: File; preview: string }
  onReorder: (result: reorderedItem) => void
  onRemove: (id: string) => void
  index: number
}) {
  const imagesRef = useRef(null)
  const [dragging, setDragging] = useState<boolean>(false)
  const [isDraggedOver, setIsDraggedOver] = useState(false)

  useEffect(() => {
    const image = imagesRef.current
    invariant(image, "image is null")

    const dropTargetCleanup = dropTargetForElements({
      element: image,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: (event) => {
        setIsDraggedOver(false)
        const destinationIndex = index
        const sourceIndex = Number(
          event.source.element.getAttribute("data-index")
        )

        if (destinationIndex !== sourceIndex) {
          onReorder({
            destination: { index: destinationIndex },
            source: { index: sourceIndex },
          })
        }
      },
    })

    const draggableCleanup = draggable({
      element: image,
      onDragStart: () => {
        setDragging(true)
      },
      onDrop: () => {
        setDragging(false)
      },
    })

    return () => {
      dropTargetCleanup()
      draggableCleanup()
    }
  }, [index, onReorder])

  return (
    <div
      ref={imagesRef}
      data-index={index}
      className={`glass rounded-2xl p-2 flex items-center gap-4 border border-sky-500 m-2 ${
        dragging ? "border-dashed border-2 opacity-30" : ""
      }
        ${isDraggedOver ? "bg-blue-500/30" : ""}`}
      draggable='false'
    >
      <div className='cursor-grab'>
        <GripVertical className='text-sky-600' />
      </div>
      <Image
        src={image.preview}
        alt={`Preview ${image.file.name}`}
        className='w-16 h-16 object-cover rounded'
        width={64}
        height={64}
      />
      <span className='flex-1 truncate text-sky-600 font-medium'>
        {image.file.name}
      </span>
      <button
        onClick={() => onRemove(image.id)}
        className='p-1 hover:bg-gray-100 rounded-full transition-colors'
      >
        <X className='w-5 h-5 text-gray-500' />
      </button>
    </div>
  )
}
