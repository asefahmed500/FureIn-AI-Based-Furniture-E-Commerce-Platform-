"use client"

import * as React from "react"
import Image from "next/image"
import { PRODUCTS } from "@/lib/data"
import { SectionHeader } from "@/components/ui/section-header"
import { StarRating } from "@/components/ui/star-rating"
import { CheckCircle2, Quote } from "lucide-react"

export function CustomerReviews() {
  // Flatten all product reviews into a single list with product details attached
  const allReviews = React.useMemo(() => {
    return PRODUCTS.flatMap((product) =>
      (product.reviews || []).map((review) => ({
        ...review,
        productTitle: product.title,
        productSlug: product.slug,
        productImage: product.images[0],
      }))
    )
  }, [])

  if (!allReviews.length) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 bg-gradient-to-b from-background via-secondary/20 to-background border-t border-border/40">
      <SectionHeader
        title="Loved by Homeowners"
        badge="Real Experiences"
        description="Hear directly from our verified community about how FureIn signature pieces transformed their daily living spaces."
        className="mb-10 text-center max-w-2xl mx-auto [&>div]:mx-auto"
      />

      {/* Masonry or flexible cards layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allReviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col justify-between rounded-2xl border border-border/60 bg-background p-6 shadow-xs transition-shadow hover:shadow-md relative overflow-hidden"
          >
            {/* Background absolute subtle quote icon */}
            <Quote className="absolute right-4 top-4 h-16 w-16 text-muted-foreground/5 stroke-[0.5] pointer-events-none" />

            <div className="flex flex-col gap-3 z-10">
              {/* Rating and Verification */}
              <div className="flex items-center justify-between">
                <StarRating rating={review.rating} showCount={false} size="sm" />
                {review.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified Buyer
                  </span>
                )}
              </div>

              {/* Title & Comment */}
              <h4 className="text-sm font-bold text-foreground line-clamp-1">
                &ldquo;{review.title}&rdquo;
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed italic line-clamp-4">
                {review.comment}
              </p>
            </div>

            {/* Author & Associated Product Footer */}
            <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between gap-3 z-10">
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-foreground">
                  {review.author}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {review.date}
                </span>
              </div>

              {/* Small preview of the product reviewed */}
              <div className="flex items-center gap-2 bg-secondary/60 rounded-lg p-1.5 border border-border/40 max-w-[140px]">
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded bg-background">
                  <Image
                    src={review.productImage}
                    alt={review.productTitle}
                    fill
                    className="object-contain"
                    sizes="28px"
                  />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground truncate">
                  {review.productTitle}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
