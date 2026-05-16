"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  icon: LucideIcon
  label: string
  href: string
}

interface DashboardNavProps {
  navItems: NavItem[]
}

export function DashboardNav({ navItems }: DashboardNavProps) {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-4 h-12 rounded-xl text-xs font-bold transition-all duration-300",
              isActive 
                ? "bg-zinc-950 text-white shadow-xl shadow-zinc-950/20" 
                : "text-zinc-600 hover:bg-white hover:text-zinc-950 hover:shadow-lg hover:shadow-zinc-200/40"
            )}
          >
            <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-inherit")} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
