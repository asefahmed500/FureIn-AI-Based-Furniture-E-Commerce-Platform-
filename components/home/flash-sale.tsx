"use client"

import * as React from "react"
import { Product } from "@/generated/prisma/client"
import { ProductCard } from "@/components/ui/product-card"
import { CountdownTimer } from "@/components/ui/countdown-timer"
import { Progress } from "@/components/ui/progress"
import { Flame } from "lucide-react"

interface FlashSaleProps {
  products: Product[]
}

export function FlashSale({ products }: FlashSaleProps) {

  // Target end of the current day for the countdown timer
  const targetDate = React.useMemo(() => {
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)
    return endOfDay
  }, [])

  if (!products.length) return null

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber/5 via-background to-background py-12 sm:py-16 border-y border-amber/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Countdown */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
          <div className="flex flex-col gap-2">
            {/* Amber glowing gradient badge */}
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-amber to-amber/80 px-3 py-1 text-xs font-extrabold tracking-wide text-white uppercase shadow-sm animate-pulse-gentle">
              <Flame className="h-3.5 w-3.5 fill-white" />
              Flash Sale
            </span>

            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Limited Time Deals
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Unbeatable prices on signature handcrafted pieces. Offers end when the timer expires or stock runs out.
            </p>
          </div>

          {/* Countdown Display */}
          <div className="flex flex-col gap-1.5 md:items-end shrink-0 pt-2 md:pt-0">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Offer Ends In:
            </span>
            <CountdownTimer targetDate={targetDate} />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            // Derive consistent dynamic pseudo-random stock metrics using product id length/char codes
            const totalStock = product.stock + 12
            const soldCount = totalStock - product.stock
            const percentSold = Math.min(100, Math.round((soldCount / totalStock) * 100))

            return (
              <div key={product.id} className="flex flex-col gap-3">
                <ProductCard product={product} variant="grid" />

                {/* Limited Stock Progress Indicator */}
                <div className="flex flex-col gap-1.5 px-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">
                      Sold: <strong className="text-foreground">{soldCount}</strong>
                    </span>
                    <span className="text-amber font-bold">
                      {product.stock} Available
                    </span>
                  </div>
                  <Progress
                    value={percentSold}
                    className="h-2 [&>div]:bg-amber bg-secondary/80"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
