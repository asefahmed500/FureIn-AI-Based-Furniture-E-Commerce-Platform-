"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ── Slide data ─────────────────────────────────────────────────
const heroSlides = [
  {
    id: 1,
    image: "/hero/images/hero-1.png",
    tagline: "Summer Collection 2026",
    headline: "Crafting Comfort,\nDefining Spaces",
    description:
      "Discover handcrafted furniture made from solid oak and premium fabrics — designed to transform your living room into a sanctuary.",
    cta: { label: "Shop the Collection", href: "/shop" },
    ctaSecondary: { label: "Explore Sofas", href: "/shop/sofas" },
    overlayAlign: "left" as const,
  },
  {
    id: 2,
    image: "/hero/images/hero-2.png",
    tagline: "Statement Seating",
    headline: "Bold Colors,\nTimeless Design",
    description:
      "Make a statement with our velvet accent chairs — rich emerald, sapphire & burgundy. Handcrafted with solid walnut frames.",
    cta: { label: "Shop Chairs", href: "/shop/chairs" },
    ctaSecondary: { label: "View All Seating", href: "/shop/chairs" },
    overlayAlign: "left" as const,
  },
  {
    id: 3,
    image: "/hero/images/hero-3.png",
    tagline: "Storage & Style",
    headline: "Mid-Century\nMedia Consoles",
    description:
      "Solid walnut media consoles with brass detailing. Thoughtful storage meets iconic mid-century design.",
    cta: { label: "Shop Storage", href: "/shop/storage" },
    ctaSecondary: { label: "View TV Stands", href: "/shop/storage" },
    overlayAlign: "left" as const,
  },
]

const AUTOPLAY_INTERVAL = 6000 // 6 seconds per slide

// ── Hero Component ─────────────────────────────────────────────
export function HeroSection() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [direction, setDirection] = React.useState<"next" | "prev">("next")
  const [isAnimating, setIsAnimating] = React.useState(false)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  const slideCount = heroSlides.length

  // ── Autoplay logic ────────────────────────────────────────
  const startAutoplay = React.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDirection("next")
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev + 1) % slideCount)
    }, AUTOPLAY_INTERVAL)
  }, [slideCount])

  const stopAutoplay = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  React.useEffect(() => {
    if (isPlaying) {
      startAutoplay()
    } else {
      stopAutoplay()
    }
    return () => stopAutoplay()
  }, [isPlaying, startAutoplay, stopAutoplay])

  // ── Animation reset ───────────────────────────────────────
  React.useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 800)
      return () => clearTimeout(timer)
    }
  }, [isAnimating, currentSlide])

  // ── Navigation handlers ───────────────────────────────────
  const goToSlide = React.useCallback(
    (index: number) => {
      if (index === currentSlide || isAnimating) return
      setDirection(index > currentSlide ? "next" : "prev")
      setIsAnimating(true)
      setCurrentSlide(index)
      if (isPlaying) startAutoplay() // Reset timer
    },
    [currentSlide, isAnimating, isPlaying, startAutoplay]
  )

  const goNext = React.useCallback(() => {
    if (isAnimating) return
    setDirection("next")
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % slideCount)
    if (isPlaying) startAutoplay()
  }, [isAnimating, slideCount, isPlaying, startAutoplay])

  const goPrev = React.useCallback(() => {
    if (isAnimating) return
    setDirection("prev")
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount)
    if (isPlaying) startAutoplay()
  }, [isAnimating, slideCount, isPlaying, startAutoplay])

  // ── Keyboard navigation ───────────────────────────────────
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === " ") {
        e.preventDefault()
        setIsPlaying((p) => !p)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goNext, goPrev])

  const slide = heroSlides[currentSlide]

  return (
    <section
      className="relative w-full overflow-hidden bg-foreground"
      aria-label="Hero banner carousel"
      role="region"
    >
      {/* ── Slides Container ──────────────────────────────── */}
      <div className="relative h-[480px] w-full sm:h-[540px] md:h-[600px] lg:h-[680px]">
        {heroSlides.map((s, index) => (
          <div
            key={s.id}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-out",
              index === currentSlide
                ? "z-10 opacity-100"
                : "z-0 opacity-0"
            )}
            aria-hidden={index !== currentSlide}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={s.image}
                alt={s.headline.replace("\n", " ")}
                fill
                className={cn(
                  "object-cover object-center transition-transform duration-[8000ms] ease-out",
                  index === currentSlide ? "scale-105" : "scale-100"
                )}
                priority={index === 0}
                sizes="100vw"
                quality={90}
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        ))}

        {/* ── Content Overlay ─────────────────────────────── */}
        <div className="relative z-20 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl lg:max-w-2xl">
              {/* Tagline */}
              <div
                key={`tag-${currentSlide}`}
                className={cn(
                  "mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm",
                  "opacity-0 animate-fade-in-up"
                )}
                style={{ animationDelay: "0.1s" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse-gentle" />
                <span className="text-xs font-semibold tracking-wider text-white/90 uppercase sm:text-sm">
                  {slide.tagline}
                </span>
              </div>

              {/* Headline */}
              <h1
                key={`head-${currentSlide}`}
                className={cn(
                  "text-3xl font-bold leading-[1.1] tracking-tight text-white whitespace-pre-line sm:text-4xl md:text-5xl lg:text-6xl",
                  "opacity-0 animate-fade-in-up"
                )}
                style={{ animationDelay: "0.25s" }}
              >
                {slide.headline}
              </h1>

              {/* Description */}
              <p
                key={`desc-${currentSlide}`}
                className={cn(
                  "mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base md:mt-6 md:max-w-lg md:text-lg",
                  "opacity-0 animate-fade-in-up"
                )}
                style={{ animationDelay: "0.4s" }}
              >
                {slide.description}
              </p>

              {/* CTAs */}
              <div
                key={`cta-${currentSlide}`}
                className={cn(
                  "mt-6 flex flex-wrap gap-3 md:mt-8",
                  "opacity-0 animate-fade-in-up"
                )}
                style={{ animationDelay: "0.55s" }}
              >
                <Button
                  asChild
                  size="lg"
                  className="group h-12 rounded-xl bg-white px-6 text-sm font-semibold text-foreground shadow-lg transition-all hover:bg-white/90 hover:shadow-xl sm:h-13 sm:px-8 sm:text-base"
                >
                  <Link href={slide.cta.href}>
                    {slide.cta.label}
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-xl border-white/30 bg-transparent px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 hover:border-white/50 sm:h-13 sm:px-8 sm:text-base"
                >
                  <Link href={slide.ctaSecondary.href}>
                    {slide.ctaSecondary.label}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Navigation Arrows ───────────────────────────── */}
        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:border-white/40 sm:left-6 sm:p-3"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:border-white/40 sm:right-6 sm:p-3"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* ── Bottom Controls ─────────────────────────────── */}
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 sm:bottom-8">
          {/* Slide indicators with progress */}
          <div className="flex items-center gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  "relative h-1.5 overflow-hidden rounded-full transition-all duration-300",
                  index === currentSlide
                    ? "w-10 bg-white/30"
                    : "w-1.5 bg-white/30 hover:bg-white/50"
                )}
              >
                {index === currentSlide && (
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-white animate-progress-bar"
                    style={{
                      ["--duration" as string]: isPlaying
                        ? `${AUTOPLAY_INTERVAL}ms`
                        : "999999s",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="rounded-full border border-white/20 bg-black/30 p-1.5 text-white backdrop-blur-sm transition-all hover:bg-black/50"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="h-3 w-3" />
            ) : (
              <Play className="h-3 w-3" />
            )}
          </button>

          {/* Slide counter */}
          <span className="text-xs font-medium text-white/70 tabular-nums">
            {String(currentSlide + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ── Trust Bar ─────────────────────────────────────── */}
      <div className="relative z-20 border-t border-white/10 bg-primary">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 py-3 sm:gap-10 sm:px-6 lg:justify-between lg:px-8">
          <TrustItem icon="🚚" text="Free Delivery Over $800" />
          <TrustItem icon="↩️" text="30-Day Easy Returns" />
          <TrustItem icon="🛡️" text="2-Year Warranty" />
          <TrustItem icon="🌿" text="Sustainably Sourced" />
        </div>
      </div>
    </section>
  )
}

// ── Trust Item ──────────────────────────────────────────────────
function TrustItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-primary-foreground/90">
      <span className="text-base">{icon}</span>
      <span className="text-xs font-medium tracking-wide sm:text-sm">{text}</span>
    </div>
  )
}
