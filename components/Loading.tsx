import { Skeleton } from "@/components/ui/skeleton"
export function Loading() {
  return (
    <div className='px-4 py-6 flex-1 overflow-x-auto'>
      <div className='flex items-center gap-2 justify-center mb-4'>
        <Skeleton className='w-10 h-10 rounded-md' />
        <Skeleton className='h-8 w-48 rounded-md' />
      </div>
      <Skeleton className='h-4 w-full max-w-md mx-auto mb-8' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className='h-32 w-full rounded-lg' />
        ))}
      </div>
    </div>
  )
}
