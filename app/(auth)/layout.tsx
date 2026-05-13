"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Landmark } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Visual Side */}
      <div className="hidden lg:block relative bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero/images/hero-1.png" 
            alt="Architectural Interior" 
            fill 
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 h-full flex flex-col justify-between p-16">
          <Link href="/" className="flex items-center gap-2 text-white group w-fit">
            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 shadow-lg">
              <Landmark className="h-6 w-6 text-zinc-950" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase drop-shadow-md">FureIn</span>
          </Link>

          <div className="space-y-6 max-w-lg">
            <h2 className="text-5xl font-black text-white leading-tight drop-shadow-lg">
              Preserving <span className="text-primary italic">Architectural</span> Legacy.
            </h2>
            <p className="text-zinc-300 text-lg font-medium leading-relaxed drop-shadow-md">
              Join the vanguard of modern design. Access exclusive collections, personalized architectural consultations, and lifetime structural guarantees.
            </p>
          </div>

          <div className="flex items-center gap-12">
            <div>
              <p className="text-3xl font-black text-white drop-shadow-md">12.5k</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-1">Global Citizens</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white drop-shadow-md">48</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-1">Design Guilds</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white drop-shadow-md">100%</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-1">Authenticity</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="flex flex-col bg-background relative">
        <div className="lg:hidden absolute top-8 left-8">
           <Link href="/" className="text-2xl font-black tracking-tighter uppercase">FureIn</Link>
        </div>
        
        <div className="absolute top-8 right-8">
          <Link href="/" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-3 w-3" />
            Back to Gallery
          </Link>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-[440px]">
            {children}
          </div>
        </div>

        <div className="p-8 text-center border-t border-border/50">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">
            © 2026 FureIn Architectural Systems. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
