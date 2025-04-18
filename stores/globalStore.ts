import { create } from "zustand"
import { INVOICE_CUSTOMER, COSTS, ACCOUNTANT } from "@/lib/constants"

type GlobalStore = {
  document: {
    id?: string
    name: string
    type: typeof COSTS | typeof INVOICE_CUSTOMER | typeof ACCOUNTANT
    filePath?: string
  } | null
  setDocument: (document: {
    id?: string
    name: string
    type: typeof COSTS | typeof INVOICE_CUSTOMER | typeof ACCOUNTANT
    filePath?: string
  }) => void
}
export const useGlobalStore = create<GlobalStore>((set) => ({
  document: null,
  setDocument: (document) => set({ document }),
}))
