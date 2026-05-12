"use client"

import * as React from "react"
import { 
  Package, 
  ShoppingBag, 
  Clock, 
  TrendingUp, 
  ArrowUpRight,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useUserStore } from "@/lib/store"
import Link from "next/link"
import Image from "next/image"

export default function DashboardPage() {
  const { user } = useUserStore()

  const stats = [
    { label: "Active Orders", value: "02", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Collection Value", value: "$4,250", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Items in Cart", value: "03", icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10" },
    { label: "Inquiry Response", value: "1.2h", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
  ]

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight">Architectural Overview</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
            Welcome back, <span className="text-foreground">{user?.name}</span>.
          </p>
        </div>
        <Button asChild className="h-12 rounded-xl font-bold px-6">
          <Link href="/shop">
            <Plus className="mr-2 h-5 w-5" />
            Explore New Pieces
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-border/50 bg-secondary/5 overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.icon}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Recent Activity */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black uppercase tracking-widest">Recent Acquisitions</h2>
            <Button variant="link" className="text-xs font-bold uppercase tracking-widest p-0 h-auto">View All</Button>
          </div>
          <div className="rounded-2xl border border-border/50 overflow-hidden bg-background">
            <div className="p-8 text-center py-20">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-muted-foreground/30" />
              </div>
              <h3 className="font-black text-lg mb-2">No recent orders found</h3>
              <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto">
                Start building your architectural collection to see your order history here.
              </p>
              <Button asChild variant="outline" className="mt-8 h-11 border-2 font-bold px-8 rounded-xl">
                <Link href="/shop">Browse Catalog</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-8">
          <div className="rounded-2xl bg-primary text-primary-foreground p-8 relative overflow-hidden group">
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/10 blur-3xl rounded-full transition-transform group-hover:scale-150 duration-700" />
            <h3 className="text-xl font-black uppercase tracking-widest mb-4">FureIn Finance</h3>
            <p className="text-sm font-medium leading-relaxed opacity-80 mb-8">
              Prequalify for specialized financing and build your space with architectural integrity.
            </p>
            <Button className="w-full h-12 bg-white text-primary hover:bg-zinc-100 font-bold rounded-xl border-0 shadow-lg">
              Check Eligibility
            </Button>
          </div>

          <div className="rounded-2xl border border-border/50 p-8 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest">Curator&apos;s Choice</h3>
            <div className="flex gap-4">
              <div className="h-20 w-20 rounded-xl bg-secondary overflow-hidden shrink-0 border relative">
                <Image 
                  src="https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=200&auto=format&fit=crop" 
                  alt="Curator's Choice"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 py-1">
                <p className="text-xs font-black uppercase tracking-widest">Velvet Modular Sofa</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">$2,450</p>
                <Link href="/product/velvet-modular-sofa" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline pt-1 block">View Details</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
