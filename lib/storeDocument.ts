export async function storeDocument(
  pdfBytes: Uint8Array<ArrayBufferLike> | File,
  documentName: string,
  classification: string
) {
  const file = new File([pdfBytes], documentName, {
    type: "application/pdf",
  })
  const formData = new FormData()
  formData.append("file", file)
  formData.append("classification", classification)
  await fetch("/api/stockFile", {
    method: "POST",
    body: formData,
  })
}
