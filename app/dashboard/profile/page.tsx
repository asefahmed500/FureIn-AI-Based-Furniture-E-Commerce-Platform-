"use client"

import * as React from "react"
import { useUserStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, ShieldCheck, Mail, User } from "lucide-react"

export default function ProfilePage() {
  const { user } = useUserStore()

  if (!user) return null

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h1 className="text-4xl font-black tracking-tight">Citizen Profile</h1>
        <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
          Manage your architectural identity and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Left: Avatar & Identity */}
        <div className="space-y-8">
          <div className="p-8 rounded-2xl bg-secondary/5 border border-border/50 text-center space-y-6">
            <div className="relative mx-auto w-32 h-32">
              <Avatar className="w-full h-full border-4 border-primary/20">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute bottom-0 right-0 h-10 w-10 rounded-full shadow-xl">
                <Camera className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black">{user.name}</h3>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{user.email}</p>
            </div>
            <div className="pt-4 flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                Verified Citizen
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-[10px] font-black uppercase tracking-widest border border-border/50">
                Legacy Member
              </span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-primary text-primary-foreground space-y-4">
            <ShieldCheck className="h-8 w-8 opacity-50" />
            <h4 className="font-black uppercase tracking-widest text-sm">Security Clearance</h4>
            <p className="text-xs font-medium opacity-80 leading-relaxed">
              Two-factor authentication is active. Your architectural data is encrypted with high-grade preservation protocols.
            </p>
          </div>
        </div>

        {/* Right: Form Settings */}
        <div className="xl:col-span-2 space-y-8">
          <section className="space-y-6">
            <h3 className="text-xl font-black uppercase tracking-widest border-b border-border/50 pb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Display Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                  <Input defaultValue={user.name} className="h-12 pl-12 rounded-xl bg-secondary/20 border-border/50 font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Architectural Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                  <Input defaultValue={user.email} className="h-12 pl-12 rounded-xl bg-secondary/20 border-border/50 font-medium" />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-black uppercase tracking-widest border-b border-border/50 pb-4">Communication Protocols</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/5 border border-border/50">
                <div className="space-y-1">
                  <p className="text-sm font-black uppercase tracking-widest">Order Dossiers</p>
                  <p className="text-xs font-medium text-muted-foreground">Receive detailed reports on order status and transit.</p>
                </div>
                {/* Simplified toggle placeholder */}
                <div className="h-6 w-12 rounded-full bg-primary relative cursor-pointer">
                  <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/5 border border-border/50">
                <div className="space-y-1">
                  <p className="text-sm font-black uppercase tracking-widest">Architectural Insights</p>
                  <p className="text-xs font-medium text-muted-foreground">Get exclusive access to new collection arrivals and trend reports.</p>
                </div>
                <div className="h-6 w-12 rounded-full bg-zinc-200 relative cursor-pointer">
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            </div>
          </section>

          <div className="pt-6 flex justify-end gap-4">
            <Button variant="outline" className="h-12 rounded-xl font-black px-8 border-2 uppercase tracking-widest text-xs">
              Discard Changes
            </Button>
            <Button className="h-12 rounded-xl font-black px-8 uppercase tracking-widest text-xs shadow-lg shadow-primary/20">
              Save Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
