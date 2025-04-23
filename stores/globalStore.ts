import { create } from "zustand"
import { INVOICE_CUSTOMER, COSTS, ACCOUNTANT } from "@/lib/constants"

type GlobalStore = {
  isGuest: boolean
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
  setIsGuest: (isGuest: boolean) => void
}
export const useGlobalStore = create<GlobalStore>((set) => ({
  document: null,
  setDocument: (document) => set({ document }),
  isGuest: true,
  setIsGuest: (isGuest) => set({ isGuest }),
}))
