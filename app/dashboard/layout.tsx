import * as React from "react"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Package, 
  Heart, 
  Bell, 
  Settings,
  UserCircle,
  ShieldCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { LogoutButton } from "@/components/auth/logout-button"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { MobileDashboardNav } from "@/components/dashboard/mobile-dashboard-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/login")
  }

  const user = session.user

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Package, label: "Orders", href: "/dashboard/orders" },
    { icon: Heart, label: "Wishlist", href: "/dashboard/wishlist" },
    { icon: UserCircle, label: "Profile", href: "/dashboard/profile" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      {/* Top Bar */}
      <header className="h-20 border-b border-zinc-100 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="container h-full mx-auto px-6 flex items-center justify-between max-w-[1400px]">
          <div className="flex items-center gap-6">
            <MobileDashboardNav navItems={navItems} user={user} />
            <Link href="/" className="text-2xl font-black tracking-tighter uppercase group">
              <span className="group-hover:text-primary transition-colors">FUREIN</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-zinc-50">
                <Bell className="h-5 w-5 text-zinc-600" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-primary rounded-full border-2 border-white" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-zinc-50">
                <ShieldCheck className="h-5 w-5 text-zinc-600" />
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6 bg-zinc-100" />
            <div className="flex items-center gap-4 group cursor-pointer pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{user?.name || "User"}</p>
                <p className="text-[9px] font-bold text-zinc-400 lowercase leading-none">{user?.email || ""}</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-zinc-50 shadow-sm group-hover:border-primary/20 transition-all">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "User"}`} />
                <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-black">{user?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-6 flex gap-16 py-12 max-w-[1400px]">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:flex w-72 flex-col gap-10 shrink-0">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-4 mb-4">Enterprise Hub</p>
            <DashboardNav navItems={navItems} />
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-4">Account Security</p>
            <LogoutButton />
          </div>

          <div className="mt-auto p-8 rounded-[2.5rem] bg-zinc-950 text-white relative overflow-hidden group">
            <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-white/5 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">Curated Support</h4>
            <p className="text-xs font-medium text-zinc-400 leading-relaxed">
              In need of bespoke architectural guidance? Our concierge is on standby.
            </p>
            <Button variant="outline" className="w-full mt-6 h-11 text-[10px] font-black uppercase tracking-widest border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:text-white rounded-xl transition-all">
              Contact Concierge
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
