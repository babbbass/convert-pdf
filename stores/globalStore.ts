import { create } from "zustand"

type GlobalStore = {
  documentName: string
  setDocumentName: (documentName: string) => void
}
export const useGlobalStore = create<GlobalStore>((set) => ({
  documentName: "",
  setDocumentName: (documentName) => set({ documentName }),
}))
