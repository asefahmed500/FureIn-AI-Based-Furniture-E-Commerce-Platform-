import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: "sm" | "md" | "lg"
  showCount?: boolean
  className?: string
  onRatingChange?: (rating: number) => void
  interactive?: boolean
}

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
  className,
  onRatingChange,
  interactive = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null)

  // Determine sizes
  const starSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-5 w-5",
    lg: "h-7 w-7",
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  const displayRating = hoverRating !== null ? hoverRating : rating

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div 
        className="flex items-center gap-0.5" 
        aria-label={`Rating: ${rating} out of 5 stars`}
        onMouseLeave={() => interactive && setHoverRating(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const fillPercentage = Math.max(0, Math.min(100, (displayRating - star + 1) * 100))

          return (
            <div 
              key={star} 
              className={cn("relative inline-flex", interactive && "cursor-pointer transition-transform hover:scale-110 active:scale-95")}
              onMouseEnter={() => interactive && setHoverRating(star)}
              onClick={() => interactive && onRatingChange?.(star)}
            >
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
