import * as React from "react"
import { 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  ArrowUpRight,
  Plus,
  Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getUserDashboardData } from "@/lib/actions/user"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")
  
  const data = await getUserDashboardData()
  const user = session.user

  const stats = [
    { label: "Active Orders", value: (data?.stats?.activeOrders || 0).toString().padStart(2, '0'), icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Spent", value: `$${(data?.stats?.totalSpent || 0).toLocaleString()}`, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Cart Items", value: (data?.stats?.cartItems || 0).toString().padStart(2, '0'), icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10" },
    { label: "Wishlist", value: (data?.stats?.wishlistItems || 0).toString().padStart(2, '0'), icon: Heart, color: "text-amber-500", bg: "bg-amber-500/10" },
  ]

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight uppercase">Account Executive</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-wider text-[10px]">
            Welcome back, <span className="text-foreground">{user?.name}</span>. Synchronizing your collection metrics.
          </p>
        </div>
        <Button asChild className="h-12 rounded-xl font-bold px-6 shadow-xl shadow-primary/20">
          <Link href="/shop">
            <Plus className="mr-2 h-5 w-5" />
            Shop New Furniture
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-border/50 bg-secondary/5 overflow-hidden group hover:scale-[1.02] transition-all duration-500 rounded-[2rem]">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
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
            <h2 className="text-xl font-bold uppercase tracking-wider">Recent Logistics</h2>
            <Button asChild variant="link" className="text-xs font-bold uppercase tracking-wider p-0 h-auto">
              <Link href="/dashboard/orders">View All Ledger</Link>
            </Button>
          </div>
          
          {data?.orders && data.orders.length > 0 ? (
            <div className="space-y-4">
              {data.orders.map((order) => (
                <div key={order.id} className="p-6 rounded-[2rem] border border-border/50 bg-white hover:shadow-xl transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                      <Package className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold uppercase tracking-tight">#ORD-{order.id.slice(-8).toUpperCase()}</p>
                      <p className="text-[10px] font-medium text-muted-foreground">{format(new Date(order.createdAt), "MMMM d, yyyy")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <Badge variant="secondary" className={cn(
                      "text-[9px] font-bold uppercase tracking-widest px-3 h-6 rounded-lg",
                      order.status === "DELIVERED" && "bg-emerald-50 text-emerald-600",
                      order.status === "SHIPPED" && "bg-blue-50 text-blue-600",
                      order.status === "PROCESSING" && "bg-amber-50 text-amber-600",
                      order.status === "PENDING" && "bg-zinc-100 text-zinc-600",
                    )}>
                      {order.status}
                    </Badge>
                    <span className="text-sm font-bold">${Number(order.total).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[2.5rem] border border-border/50 overflow-hidden bg-background">
              <div className="p-8 text-center py-20">
                <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                  <Package className="h-8 w-8 text-muted-foreground/30" />
                </div>
                <h3 className="font-bold text-lg mb-2 uppercase">No Ledger Entries</h3>
                <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto">
                  Your acquisition history is currently empty. Start building your space.
                </p>
                <Button asChild variant="outline" className="mt-8 h-11 border-2 font-bold px-8 rounded-xl">
                  <Link href="/shop">Browse Shop</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-8">
          <div className="rounded-[2.5rem] bg-zinc-950 text-white p-10 relative overflow-hidden group">
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-3xl rounded-full transition-transform group-hover:scale-150 duration-700" />
            <h3 className="text-xl font-bold uppercase tracking-wider mb-4 leading-tight">Enterprise Financing</h3>
            <p className="text-xs font-medium leading-relaxed opacity-60 mb-10">
              Prequalify for bespoke payment plans and manifest your architectural vision today.
            </p>
            <Button className="w-full h-14 bg-white text-zinc-950 hover:bg-zinc-100 font-bold rounded-2xl border-0 shadow-lg uppercase text-[10px] tracking-widest">
              Check Eligibility
            </Button>
          </div>

          <div className="rounded-[2.5rem] border border-border/50 p-8 space-y-6 bg-secondary/5">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Architectural Highlight</h3>
            <div className="flex gap-4 group cursor-pointer">
              <div className="h-20 w-20 rounded-2xl bg-secondary overflow-hidden shrink-0 border border-border/50 relative">
                <Image 
                  src="https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=200&auto=format&fit=crop" 
                  alt="Top Pick"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1 py-1">
                <p className="text-xs font-bold uppercase tracking-tight group-hover:text-primary transition-colors">Velvet Modular Sofa</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">$2,450</p>
                <Link href="/product/velvet-modular-sofa" className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline pt-2 block">Acquire Piece</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
