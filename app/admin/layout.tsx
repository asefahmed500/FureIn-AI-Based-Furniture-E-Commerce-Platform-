"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Search,
  Bell,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const ADMIN_NAV = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Inventory", href: "/admin/products", icon: Package },
  { name: "Dossiers", href: "/admin/orders", icon: ShoppingCart },
  { name: "Citizens", href: "/admin/users", icon: Users },
  { name: "Intelligence", href: "/admin/analytics", icon: BarChart3 },
  { name: "System", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-950 font-sans">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-zinc-200">
        <h1 className="font-black tracking-[0.2em] text-sm">FUREIN ADMIN</h1>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed lg:static inset-0 z-50 w-72 bg-white border-r border-zinc-200 h-screen transition-transform duration-300 lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}>
          <div className="flex flex-col h-full p-6">
            <div className="mb-12">
              <Link href="/admin" className="flex items-center gap-3">
                <div className="h-8 w-8 bg-zinc-950 flex items-center justify-center text-white font-black text-xs">F</div>
                <span className="font-black tracking-[0.2em] text-sm uppercase">Administration</span>
              </Link>
            </div>

            <nav className="flex-grow space-y-2">
              {ADMIN_NAV.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200",
                      isActive 
                        ? "bg-zinc-950 text-white shadow-lg shadow-zinc-950/20" 
                        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            <div className="pt-6 border-t border-zinc-100">
              <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                Terminate Session
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow min-h-screen p-4 lg:p-8 overflow-y-auto">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input 
                placeholder="Search dossiers, items, or citizens..." 
                className="h-12 pl-12 rounded-xl bg-white border-zinc-200 shadow-sm focus:ring-zinc-950 transition-all"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-zinc-200 bg-white shadow-sm relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red-500" />
              </Button>
              <div className="h-10 w-[1px] bg-zinc-200 mx-2" />
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black uppercase tracking-widest">H. Architect</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.1em]">Super Administrator</p>
                </div>
                <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
