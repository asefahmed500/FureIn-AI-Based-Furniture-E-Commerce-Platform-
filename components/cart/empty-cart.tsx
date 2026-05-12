import * as React from "react"
import Link from "next/link"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 scale-150 blur-3xl bg-primary/10 rounded-full" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-secondary shadow-inner">
          <ShoppingBag className="h-10 w-10 text-muted-foreground/60" />
        </div>
      </div>
      
      <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
        Your collection is empty
      </h2>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        It seems you haven&apos;t selected any architectural pieces yet. Explore our curated catalog to find the perfect addition to your space.
      </p>
      
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="h-14 px-8 rounded-xl font-bold text-lg">
          <Link href="/shop">
            Browse Storefront
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-xl font-bold text-lg border-2">
          <Link href="/shop?sort=newest">
            View New Arrivals
          </Link>
        </Button>
      </div>
    </div>
  )
}
