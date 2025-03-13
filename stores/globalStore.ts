import { create } from "zustand"
import { INVOICE_CUSTOMER, COSTS, ACCOUNTANT } from "@/lib/constants"

type GlobalStore = {
  document: {
    name: string
    type: typeof COSTS | typeof INVOICE_CUSTOMER | typeof ACCOUNTANT
  } | null
  setDocument: (document: {
    name: string
    type: typeof COSTS | typeof INVOICE_CUSTOMER | typeof ACCOUNTANT
  }) => void
}
export const useGlobalStore = create<GlobalStore>((set) => ({
  document: null,
  setDocument: (document) => set({ document }),
}))
