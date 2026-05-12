"use client"

import * as React from "react"
import Link from "next/link"
import { CheckCircle, Package, ArrowRight, Printer, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CheckoutSuccess() {
  const [orderNumber, setOrderNumber] = React.useState<string>("")

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrderNumber(Math.random().toString(36).substring(2, 10).toUpperCase())
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 fade-in duration-700">
      <div className="relative mb-10">
        <div className="absolute inset-0 scale-150 blur-3xl bg-emerald-500/20 rounded-full" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500 shadow-xl shadow-emerald-500/40">
          <CheckCircle className="h-12 w-12 text-white" />
        </div>
      </div>
      
      <div className="space-y-4 max-w-lg">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
          Acquisition Successful
        </h2>
        <p className="text-muted-foreground font-medium text-lg leading-relaxed">
          Your architectural order <span className="font-black text-foreground">#{orderNumber}</span> has been confirmed. Our curators are now preparing your collection for transit.
        </p>
      </div>

      <div className="mt-12 w-full max-w-md bg-background rounded-2xl border border-border/50 overflow-hidden">
        <div className="p-6 border-b border-border/50 bg-secondary/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-primary" />
            <span className="font-black uppercase tracking-widest text-xs">Estimated Arrival</span>
          </div>
          <span className="font-black text-sm">May 15 - May 22, 2026</span>
        </div>
        <div className="p-8 space-y-6">
          <p className="text-sm text-muted-foreground font-medium">
            A confirmation email with your architectural dossier and tracking information has been dispatched to your inbox.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold border-2">
              <Printer className="mr-2 h-4 w-4" />
              Receipt
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold border-2">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="h-14 px-8 rounded-xl font-bold text-lg">
          <Link href="/shop">
            Continue Collecting
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="secondary" size="lg" className="h-14 px-8 rounded-xl font-bold text-lg">
          <Link href="/dashboard">
            View Order Status
          </Link>
        </Button>
      </div>
    </div>
  )
}
