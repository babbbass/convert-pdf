"use client"

import { QueryClient } from "@tanstack/react-query"

export const getQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  })

//declare global {
let reactQueryClient: QueryClient | undefined
//}

export const getOrCreateQueryClient = () => {
  if (typeof window === "undefined") {
    return getQueryClient()
  }

  if (!reactQueryClient) reactQueryClient = getQueryClient()
  return reactQueryClient
}
