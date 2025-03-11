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
      className={`space-y-2 p-4 border-2 border-purple-500/30 rounded-2xl cursor-grab`}
    >
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
