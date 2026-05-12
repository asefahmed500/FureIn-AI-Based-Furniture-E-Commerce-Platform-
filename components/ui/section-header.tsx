import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  badge?: string
  description?: string
  href?: string
  linkText?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  title,
  badge,
  description,
  href,
  linkText = "View All",
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
        centered && "md:flex-col md:items-center md:justify-center text-center",
        className
      )}
    >
      <div className={cn("flex flex-col gap-2", centered && "items-center")}>
        {/* Tagline / Badge */}
        {badge && (
          <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
            {badge}
          </span>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>

      {/* Optional Link */}
      {href && (
        <Link
          href={href}
          className={cn(
            "group inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80 pt-1 md:pt-0 shrink-0",
            centered && "mt-2"
          )}
        >
          {linkText}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
