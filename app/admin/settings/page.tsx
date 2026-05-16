"use client"

import * as React from "react"
import { 
  Store, 
  Truck, 
  ShieldCheck, 
  Bell, 
  Save,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { toast } from "sonner"

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = React.useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success("Enterprise configurations synchronized successfully")
    }, 1500)
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-bold tracking-tight uppercase">Platform Architecture</h2>
          <p className="text-zinc-500 font-medium text-xs uppercase tracking-[0.2em]">Configure global ecosystem preferences and security protocols</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="h-14 px-8 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-zinc-200 transition-all active:scale-95"
        >
          {isSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Commit Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-12">
        <TabsList className="bg-zinc-100 p-1.5 rounded-3xl h-16 w-full max-w-2xl border border-zinc-200/50">
          <TabsTrigger value="general" className="rounded-2xl px-8 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">
            General
          </TabsTrigger>
          <TabsTrigger value="logistics" className="rounded-2xl px-8 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Logistics
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-2xl px-8 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-2xl px-8 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-8 mt-0 focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Store className="h-5 w-5 text-zinc-400" />
                Store Identity
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Define the core branding and contact information for your FureIn instance.
              </p>
            </div>
            <div className="md:col-span-2 space-y-8">
              <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white p-12 space-y-8 border border-zinc-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Legal Store Name</Label>
                    <Input defaultValue="FureIn Enterprise" className="h-14 rounded-2xl border-zinc-200 font-medium" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Support Email</Label>
                    <Input defaultValue="support@furein.com" className="h-14 rounded-2xl border-zinc-200 font-medium" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Global Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger className="h-14 rounded-2xl border-zinc-200 font-medium">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-zinc-200">
                        <SelectItem value="usd">USD - US Dollar</SelectItem>
                        <SelectItem value="eur">EUR - Euro</SelectItem>
                        <SelectItem value="gbp">GBP - British Pound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Regional Locale</Label>
                    <Select defaultValue="en-us">
                      <SelectTrigger className="h-14 rounded-2xl border-zinc-200 font-medium">
                        <SelectValue placeholder="Select locale" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-zinc-200">
                        <SelectItem value="en-us">English (United States)</SelectItem>
                        <SelectItem value="en-gb">English (United Kingdom)</SelectItem>
                        <SelectItem value="fr-fr">French (France)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="logistics" className="space-y-8 mt-0 focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Truck className="h-5 w-5 text-zinc-400" />
                Fulfillment Pipeline
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Manage global shipping zones, tax rules, and delivery estimation engines.
              </p>
            </div>
            <div className="md:col-span-2 space-y-8">
              <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white p-12 border border-zinc-100">
                <div className="space-y-12">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Standard Domestic Shipping</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Fixed rate for all local deliveries</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold">$12.00</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Priority Air Logistics</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Global express delivery via network partners</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold">$45.00</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Complimentary Tier</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Free shipping for orders exceeding $500</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-emerald-600 uppercase">Active</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-8 mt-0 focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-zinc-400" />
                Security Protocols
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Enforce authentication standards and manage administrative access tokens.
              </p>
            </div>
            <div className="md:col-span-2 space-y-8">
              <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white p-12 border border-zinc-100">
                <div className="space-y-12">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Two-Factor Authentication</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Mandatory for all administrative accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Session Persistence</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Require re-authentication after 24h of inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="pt-6 border-t border-zinc-50">
                    <Button variant="outline" className="h-12 rounded-xl border-zinc-200 font-bold text-[10px] uppercase tracking-widest gap-2">
                      <RefreshCw className="h-3.5 w-3.5" />
                      Rotate API Secret Keys
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-8 mt-0 focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Bell className="h-5 w-5 text-zinc-400" />
                Communication Engine
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Configure automated alerts for orders, inventory, and system health.
              </p>
            </div>
            <div className="md:col-span-2 space-y-8">
              <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white p-12 border border-zinc-100">
                <div className="space-y-12">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Order Confirmation Emails</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Send automated receipt to customers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Low Inventory Alerts</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Notify warehouse when stock drops below 5 units</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Admin Activity Reports</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Weekly digest of all platform modifications</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
