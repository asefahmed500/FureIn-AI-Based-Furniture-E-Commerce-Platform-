"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
  size?: "default" | "sm" | "lg"
  disabled?: boolean
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  size = "default",
  disabled = false
}: QuantityStepperProps) {
  const isSm = size === "sm"
  const isLg = size === "lg"

  return (
    <div className={cn(
      "flex items-center bg-secondary/50 rounded-xl p-1 border border-border/50",
      isSm ? "h-9" : isLg ? "h-14" : "h-11",
      className
    )}>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        className={cn(
          "rounded-lg hover:bg-background h-full transition-all",
          isSm ? "w-7" : "w-10"
        )}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
      >
        <Minus className={isSm ? "h-3 w-3" : "h-4 w-4"} />
      </Button>
      
      <div className={cn(
        "flex-1 text-center font-black",
        isSm ? "text-xs px-2" : "text-sm px-3"
      )}>
        {value}
      </div>

      <Button
        variant="ghost"
        size="icon"
        type="button"
        className={cn(
          "rounded-lg hover:bg-background h-full transition-all",
          isSm ? "w-7" : "w-10"
        )}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
      >
        <Plus className={isSm ? "h-3 w-3" : "h-4 w-4"} />
      </Button>
    </div>
  )
}
