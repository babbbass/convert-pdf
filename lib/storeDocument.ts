export async function storeDocument(
  pdfBytes: Uint8Array<ArrayBufferLike> | File,
  documentName: string,
  classification: string,
  isGuest = false
) {
  const file = new File([pdfBytes], documentName, {
    type: "application/pdf",
  })
  const formData = new FormData()
  formData.append("file", file)
  formData.append("classification", classification)
  formData.append("isGuest", isGuest.toString())
  try {
    const response = await fetch("/api/stockFile", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
  }
}
