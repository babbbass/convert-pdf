export function formatDateOfDay() {
  const date = new Date()

  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "numeric" })
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const formatDate = `${day}-${month}-${year}-${hours}-${minutes}`

  return formatDate
}
