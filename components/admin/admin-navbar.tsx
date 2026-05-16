"use client"

import * as React from "react"
import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AdminNavbarProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
  }
}

export function AdminNavbar({ user }: AdminNavbarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
      <div className="relative w-full md:w-[450px] group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-950 transition-colors" />
        <Input 
          placeholder="Global search: products, orders, users..." 
          className="h-14 pl-14 rounded-2xl bg-white border-zinc-200 shadow-sm focus:shadow-xl focus:ring-0 focus:border-zinc-300 transition-all text-xs font-medium"
        />
      </div>

      <div className="flex items-center gap-6 self-end md:self-auto">
        <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-zinc-200 bg-white shadow-sm relative group hover:border-zinc-300 transition-all">
          <Bell className="h-5 w-5 text-zinc-500 group-hover:text-zinc-950" />
          <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-red-500 ring-4 ring-white" />
        </Button>
        
        <div className="h-10 w-[1px] bg-zinc-200 mx-2 hidden md:block" />

        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-950">{user.name || "Admin"}</p>
            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{user.role || "Super Admin"}</p>
          </div>
          <Avatar className="h-14 w-14 border-4 border-white shadow-xl group-hover:scale-105 transition-transform">
            <AvatarImage src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || 'admin'}`} />
            <AvatarFallback>{user.name?.charAt(0) || "AD"}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}
