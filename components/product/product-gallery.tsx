"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  title: string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0)

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Viewport */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary/30 border border-border/50">
        <Image
          src={images[activeImageIndex]}
          alt={title}
          fill
          className="object-cover object-center transition-all duration-500 hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Subtle Decorative Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl border-2 bg-secondary/30 transition-all",
                activeImageIndex === index 
                  ? "border-primary shadow-sm" 
                  : "border-transparent hover:border-border grayscale-[0.3] hover:grayscale-0"
              )}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-cover object-center"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
