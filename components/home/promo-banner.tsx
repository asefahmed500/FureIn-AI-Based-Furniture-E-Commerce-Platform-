import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles, ShieldCheck, Truck, Clock } from "lucide-react"

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-secondary/60 border border-border/60 shadow-sm">
        {/* Decorative subtle ambient glows */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-amber/10 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-foreground/5 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Content side */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-7 lg:py-16 z-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur-xs px-3 py-1 text-xs font-bold text-amber border border-border/40 w-fit mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              The FureIn Custom Studio
            </div>

            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
              Tailor-Made Elegance for Your Unique Interior
            </h2>

            <p className="mt-4 text-base text-muted-foreground sm:text-lg max-w-xl">
              Collaborate directly with our master artisans. Select custom premium upholstery, customized frame stains, and bespoke configurations manufactured to millimeter perfection.
            </p>

            {/* Micro value props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 pt-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-amber shadow-2xs">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-foreground">10-Year Frame Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-amber shadow-2xs">
                  <Truck className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-foreground">White-Glove Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-amber shadow-2xs">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-foreground">Fast 3-Week Custom Build</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 font-bold shadow-md">
                <Link href="/custom-studio">
                  Start Your Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6 font-bold bg-background/50 backdrop-blur-xs">
                <Link href="/shop?material=custom">
                  Explore Swatches
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual Showcase side */}
          <div className="relative min-h-[320px] lg:min-h-full lg:col-span-5 bg-gradient-to-tr from-amber/10 to-transparent flex items-center justify-center p-6 overflow-hidden">
            {/* Soft grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative w-full max-w-sm aspect-square transition-transform duration-700 hover:scale-105">
              <Image
                src="/products/sofa-sectional-gray.png"
                alt="Custom Handcrafted Sofa Showcase"
                fill
                className="object-contain drop-shadow-xl"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              {/* Premium floating glassmorphism card label */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/80 backdrop-blur-md p-3 border border-border/50 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase text-amber tracking-wider">Configuration</div>
                  <div className="text-xs font-bold text-foreground">Aura Sectional — Bespoke Linen</div>
                </div>
                <div className="text-xs font-extrabold px-2 py-1 bg-secondary text-foreground rounded-md">
                  Studio Pick
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
