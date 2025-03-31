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
    <div>
      <h2>Une erreur est survenue!</h2>
      <button onClick={() => reset()}>Réessayer</button>
    </div>
  )
}
