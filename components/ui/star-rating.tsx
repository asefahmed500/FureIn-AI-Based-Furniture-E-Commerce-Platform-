import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: "sm" | "md" | "lg"
  showCount?: boolean
  className?: string
}

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
  className,
}: StarRatingProps) {
  // Determine sizes
  const starSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const fillPercentage = Math.max(0, Math.min(100, (rating - star + 1) * 100))

          return (
            <div key={star} className="relative inline-flex">
              {/* Background empty star */}
              <Star
                className={cn(
                  starSizes[size],
                  "text-muted-foreground/30 stroke-[1.5]"
                )}
              />

              {/* Foreground filled star with clip-path for exact decimal fill */}
              {fillPercentage > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillPercentage}%` }}
                >
                  <Star
                    className={cn(
                      starSizes[size],
                      "text-amber fill-amber stroke-amber stroke-[1.5]"
                    )}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {showCount && reviewCount !== undefined && (
        <span className={cn("font-medium text-muted-foreground", textSizes[size])}>
          ({reviewCount})
        </span>
      )}
    </div>
  )
}
