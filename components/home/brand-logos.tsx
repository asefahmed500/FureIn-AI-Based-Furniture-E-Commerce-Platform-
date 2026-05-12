import * as React from "react"

export function BrandLogos() {
  const brands = [
    { name: "Architectural Digest", desc: "Featured Studio" },
    { name: "Dwell", desc: "Innovation Award" },
    { name: "Elle Decor", desc: "Top Pick 2026" },
    { name: "Vogue Living", desc: "Editorial Choice" },
    { name: "Wallpaper*", desc: "Design Excellence" },
  ]

  return (
    <section className="border-y border-border/40 bg-secondary/30 py-8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
          Recognized by Leading Voices in Modern Architecture & Design
        </p>

        {/* Logos container */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center justify-center transition-opacity hover:opacity-100 opacity-60 cursor-default"
            >
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-amber">
                {brand.name}
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">
                {brand.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
