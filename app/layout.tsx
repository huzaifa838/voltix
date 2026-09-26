import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import RootLayoutClient from "@/components/layout/RootLayoutClient"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "VOLTIX AUDIO OS",
  description: "Personal music operating system with cybersecurity dashboard aesthetic",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-screen w-screen`}
    >
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#020607" />
      </head>
      <body className="bg-[#020607] text-[#E8F3F5] h-screen w-screen overflow-hidden">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}
