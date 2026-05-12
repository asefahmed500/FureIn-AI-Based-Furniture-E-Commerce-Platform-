"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  targetDate: Date | string | number
  className?: string
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isMounted, setIsMounted] = React.useState(false)
  const [isUrgent, setIsUrgent] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()
      let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      // If total remaining time is less than 1 hour, flag as urgent for pulse animation
      const totalHoursRemaining = difference / (1000 * 60 * 60)
      setIsUrgent(totalHoursRemaining > 0 && totalHoursRemaining < 1)

      return timeLeft
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!isMounted) {
    // Avoid hydration mismatch by rendering static placeholder framework initially
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {["Days", "Hrs", "Mins", "Secs"].map((label, idx) => (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center justify-center rounded-xl bg-secondary/60 border border-border/50 px-3 py-1.5 min-w-[52px]">
              <span className="text-base font-bold text-foreground">--</span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                {label}
              </span>
            </div>
            {idx < 3 && <span className="font-bold text-muted-foreground">:</span>}
          </React.Fragment>
        ))}
      </div>
    )
  }

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ]

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 sm:gap-2",
        isUrgent && "animate-pulse-gentle",
        className
      )}
    >
      {timeBlocks.map((block, idx) => (
        <React.Fragment key={block.label}>
          <div
            className={cn(
              "flex flex-col items-center justify-center rounded-xl bg-secondary/80 border border-border/60 px-2.5 py-1.5 min-w-[48px] sm:min-w-[56px] transition-colors",
              isUrgent && "bg-amber/10 border-amber/30 text-amber"
            )}
          >
            <span
              className={cn(
                "text-base sm:text-lg font-extrabold tracking-tight text-foreground",
                isUrgent && "text-amber font-black"
              )}
            >
              {String(block.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {block.label}
            </span>
          </div>

          {idx < 3 && (
            <span
              className={cn(
                "text-sm sm:text-base font-bold text-muted-foreground/60 self-start mt-1.5",
                isUrgent && "text-amber/60"
              )}
            >
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
