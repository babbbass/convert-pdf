import { create } from "zustand"
import { INVOICE_CUSTOMER, COSTS } from "@/lib/constants"

type GlobalStore = {
  document: {
    name: string
    type: typeof COSTS | typeof INVOICE_CUSTOMER
  } | null
  setDocument: (document: {
    name: string
    type: typeof COSTS | typeof INVOICE_CUSTOMER
  }) => void
}
export const useGlobalStore = create<GlobalStore>((set) => ({
  document: null,
  setDocument: (document) => set({ document }),
}))
