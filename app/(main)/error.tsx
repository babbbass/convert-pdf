"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.log(error)
  return (
    <div className='text-center'>
      <h2>Une erreur est survenue!</h2>
      <button
        onClick={() => reset()}
        className='mt-4 text-secondary cursor-pointer'
      >
        Réessayer
      </button>
    </div>
  )
}
