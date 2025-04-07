import {
  COSTS,
  INVOICE_CUSTOMER,
  ACCOUNTANT,
  DOCUMENT_SENT,
  DOCUMENT_DOWNLOADED,
} from "./constants"
export type reorderedItem = {
  source: { index: number }
  destination: { index: number }
}

export type Document = {
  id: string
  name: string
  url: string
  type: typeof COSTS | typeof INVOICE_CUSTOMER | typeof ACCOUNTANT
  userId: string
  createdAt: Date
  history: {
    id: string
    timestamp: Date
    action: typeof DOCUMENT_SENT | typeof DOCUMENT_DOWNLOADED
    recipient: string
  }[]
}

export type History = {
  id: string
  name: string
  date: string
  action: typeof DOCUMENT_SENT | typeof DOCUMENT_DOWNLOADED
  recipient: string
  timestamp: string
}
