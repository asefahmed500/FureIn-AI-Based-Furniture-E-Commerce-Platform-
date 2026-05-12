import type { Metadata } from "next"
import { DM_Sans, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/components/auth-provider"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "FureIn — Crafting Comfort, Defining Spaces",
    template: "%s | FureIn",
  },
  description:
    "Discover handcrafted furniture made from premium materials. Sofas, tables, chairs, beds, storage & more — designed to transform your space.",
  keywords: [
    "furniture",
    "e-commerce",
    "sofas",
    "tables",
    "chairs",
    "home decor",
    "interior design",
    "modern furniture",
    "FureIn",
  ],
  openGraph: {
    title: "FureIn — Crafting Comfort, Defining Spaces",
    description:
      "Discover handcrafted furniture made from premium materials. Transform your space with FureIn.",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", dmSans.variable)}
    >
      <body>
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider delayDuration={300}>
              {children}
              <Footer />
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
