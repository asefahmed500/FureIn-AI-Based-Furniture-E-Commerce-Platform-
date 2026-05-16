"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { DashboardNav } from "./dashboard-nav"
import { LogoutButton } from "../auth/logout-button"

interface NavItem {
  icon: LucideIcon
  label: string
  href: string
}

interface MobileDashboardNavProps {
  navItems: NavItem[]
  user: { name?: string | null; email?: string | null }
}

export function MobileDashboardNav({ navItems, user }: MobileDashboardNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 rounded-xl hover:bg-zinc-50">
          <Menu className="h-5 w-5 text-zinc-600" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] border-0 p-0 rounded-r-[2.5rem]">
        <div className="h-full flex flex-col p-8 space-y-12">
          <SheetHeader className="text-left px-2">
            <SheetTitle>
              <Link href="/" className="text-2xl font-black tracking-tighter uppercase">
                FUREIN
              </Link>
            </SheetTitle>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-2">Enterprise Hub</p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <DashboardNav navItems={navItems} />
          </div>

          <div className="space-y-8">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-zinc-950 flex items-center justify-center text-white font-black text-xs">
                {user?.name?.[0] || "U"}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-wider truncate">{user?.name}</p>
                <p className="text-[9px] font-bold text-zinc-400 lowercase truncate">{user?.email}</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
