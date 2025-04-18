import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import type { Viewport } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { frFR } from "@clerk/localizations"
import { ServiceWorkerProvider } from "@/components/ServiceWorkerProvider"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Clever Docs",
  description: "Gestion intelligente des documents",
  manifest: "/manifest.json",
  icons: [
    { rel: "icon", url: "/icons/icon-192x192.png" },
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png" },
  ],
}

export const viewport: Viewport = {
  themeColor: "#fff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang='fr'>
        <body
          className={`flex bg-slate-50 min-h-screen overflow-x-hidden max-w-4xl mx-auto py-2 ${geistMono.variable} ${inter.variable} font-sans antialiased`}
        >
          <ServiceWorkerProvider />
          {children}
          <Toaster />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  )
}
