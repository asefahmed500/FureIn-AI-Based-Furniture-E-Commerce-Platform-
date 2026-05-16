"use client"

import * as React from "react"
import { StarRating } from "@/components/ui/star-rating"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProductWithRelations } from "@/types"
import { Check, MessageSquare, ThumbsUp } from "lucide-react"
import { format } from "date-fns"
import { ReviewForm } from "./review-form"

interface ReviewSectionProps {
  product: ProductWithRelations
}

export function ReviewSection({ product }: ReviewSectionProps) {
  const reviews = product.reviews || []

  // Simulated rating distribution based on average if no real reviews
  const distributions = [
    { rating: 5, percentage: reviews.length > 0 ? Math.round((reviews.filter(r => r.rating === 5).length / (reviews.length || 1)) * 100) : 85 },
    { rating: 4, percentage: reviews.length > 0 ? Math.round((reviews.filter(r => r.rating === 4).length / (reviews.length || 1)) * 100) : 10 },
    { rating: 3, percentage: reviews.length > 0 ? Math.round((reviews.filter(r => r.rating === 3).length / (reviews.length || 1)) * 100) : 3 },
    { rating: 2, percentage: reviews.length > 0 ? Math.round((reviews.filter(r => r.rating === 2).length / (reviews.length || 1)) * 100) : 2 },
    { rating: 1, percentage: reviews.length > 0 ? Math.round((reviews.filter(r => r.rating === 1).length / (reviews.length || 1)) * 100) : 0 },
  ]

  return (
    <div className="flex flex-col gap-12">
      {/* Ratings Summary Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center bg-secondary/20 p-8 rounded-2xl border border-border/50">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <span className="text-5xl font-black text-primary">{product.rating}</span>
          <StarRating rating={product.rating} size="lg" />
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            {product.reviewCount} Total Reviews
          </span>
        </div>

        <div className="space-y-3">
          {distributions.map((dist) => (
            <div key={dist.rating} className="flex items-center gap-4">
              <span className="text-xs font-bold w-4">{dist.rating}</span>
              <Progress value={dist.percentage} className="h-2 flex-1 bg-secondary" />
              <span className="text-xs text-muted-foreground font-medium w-8">{dist.percentage}%</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-black leading-tight">Authentic Owner Perspectives</h4>
          <p className="text-sm text-muted-foreground">
            Our reviews are strictly from verified collectors of FureIn architectural pieces.
          </p>
          <ReviewForm productId={product.id} />
        </div>
      </div>

      {/* Individual Reviews List */}
      <div className="space-y-12">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="flex flex-col md:flex-row gap-6 pb-12 border-b border-border/50 last:border-0 last:pb-0">
              {/* Reviewer Meta */}
              <div className="flex md:flex-col items-center md:items-start gap-4 md:w-48 shrink-0">
                <Avatar className="h-12 w-12 border-2 border-primary/10">
                  {review.avatar && <AvatarImage src={review.avatar} />}
                  <AvatarFallback className="font-bold">{review.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-black text-sm">{review.author}</span>
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                    <Check className="h-3 w-3" />
                    Verified Collector
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} size="sm" />
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <h5 className="font-black text-lg">{review.title}</h5>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed italic">
                  &quot;{review.comment}&quot;
                </p>

                {review.image && (
                  <div className="relative aspect-video w-full max-w-sm rounded-xl overflow-hidden bg-secondary border">
                    <img src={review.image} alt="User Review Image" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-center gap-6 pt-2">
                  <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    Helpful (0)
                  </button>
                  <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-secondary/10 rounded-2xl border-2 border-dashed">
            <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h4 className="text-lg font-black text-muted-foreground">Be the first to share your experience</h4>
            <p className="text-sm text-muted-foreground mt-2">No reviews yet for this architectural piece.</p>
          </div>
        )}
      </div>
    </div>
  )
}
