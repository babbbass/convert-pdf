"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { getOrCreateQueryClient } from "@/lib/react-query"

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getOrCreateQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
