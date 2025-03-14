import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import type { Viewport } from "next"
import { Wrapper } from "@/components/Wrapper"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Photo to Pdf",
  description: "Convert your photos into beautiful PDF documents",
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
    <html lang='fr'>
      <body
        className={`flex bg-slate-50 min-h-screen max-w-4xl mx-auto py-2 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Wrapper>{children}</Wrapper>
        <Toaster />
      </body>
    </html>
  )
}
