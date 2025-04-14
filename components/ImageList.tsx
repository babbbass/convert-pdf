import { Picture } from "@/components/Picture"
import { reorderedItem } from "@/lib/types"

interface ImageListProps {
  images: { id: string; file: File; preview: string }[]
  onReorder: (result: reorderedItem) => void
  onRemove: (id: string) => void
}
export const ImageList = ({ images, onReorder, onRemove }: ImageListProps) => {
  if (images.length === 0) return null
  return (
    <div
      className={`space-y-2 p-4 border-2 border-green-600/50 rounded-2xl cursor-grab`}
    >
      <h3 className='text-xl md:text-2xl font-medium mb-4 text-center'>
        {images.length > 1 ? "Documents selectionnés" : "Document selectionné"}
      </h3>
      {images.map((image, index) => (
        <div data-index={index} key={image.id}>
          <Picture
            key={image.id}
            image={image}
            onReorder={onReorder}
            onRemove={onRemove}
            index={index}
          />
        </div>
      ))}
    </div>
  )
}
