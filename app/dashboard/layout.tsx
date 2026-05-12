"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  Heart, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react"
import { useUserStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout } = useUserStore()
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    if (mounted && !user) {
      router.push("/login")
    }
  }, [user, router, mounted])

  if (!mounted || !user) return null

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Package, label: "Orders", href: "/dashboard/orders" },
    { icon: Heart, label: "Wishlist", href: "/dashboard/wishlist" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="h-20 border-b bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container h-full mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Link href="/" className="text-2xl font-black tracking-tighter uppercase">FUREIN</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-primary rounded-full border-2 border-background" />
            </Button>
            <Separator orientation="vertical" className="h-8 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black uppercase tracking-widest">{user.name}</p>
                <p className="text-[10px] font-bold text-muted-foreground">{user.email}</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 flex gap-12 py-12">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:flex w-64 flex-col gap-8 shrink-0">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all
                  ${pathname === item.href ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}
                `}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <Separator className="bg-border/50" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-destructive hover:bg-destructive/5 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>

          <div className="mt-auto p-6 rounded-2xl bg-secondary/30 border border-border/50">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Architectural Support</h4>
            <p className="text-xs font-bold text-muted-foreground leading-relaxed">
              Need assistance with your collection? Our curators are available 24/7.
            </p>
            <Button variant="outline" className="w-full mt-4 h-9 text-[10px] font-black uppercase tracking-widest border-2 rounded-lg">
              Contact Concierge
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-sm animate-in fade-in duration-300" />
          <div className="absolute left-0 top-0 h-full w-[280px] bg-background border-r p-8 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-12">
              <span className="text-2xl font-black tracking-tighter uppercase">FureIn</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-4 text-lg font-black uppercase tracking-widest
                    ${pathname === item.href ? "text-primary" : "text-muted-foreground"}
                  `}
                >
                  <item.icon className="h-6 w-6" />
                  {item.label}
                </Link>
              ))}
              <Separator className="my-8" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 text-lg font-black uppercase tracking-widest text-destructive"
              >
                <LogOut className="h-6 w-6" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
