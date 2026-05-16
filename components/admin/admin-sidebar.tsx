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
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"

const ADMIN_NAV = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)} className="bg-white shadow-md">
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-zinc-200 h-screen transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-2xl lg:shadow-none",
        !isOpen && "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-8">
          <div className="mb-12">
            <Link href="/admin" className="flex items-center gap-4">
              <div className="h-10 w-10 bg-zinc-950 flex items-center justify-center text-white font-bold text-sm rounded-xl">F</div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-sm uppercase">FureIn</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Enterprise Admin</span>
              </div>
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
                    "flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 group",
                    isActive 
                      ? "bg-zinc-950 text-white shadow-xl shadow-zinc-950/20 translate-x-2" 
                      : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950"
                  )}
                >
                  <item.icon className={cn("h-4.5 w-4.5 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-zinc-400")} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="pt-8 border-t border-zinc-100 mt-auto">
            <Button 
              variant="ghost" 
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full justify-start gap-4 px-5 py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-all group"
            >
              <LogOut className="h-4.5 w-4.5 group-hover:-translate-x-1 transition-transform" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-zinc-950/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
