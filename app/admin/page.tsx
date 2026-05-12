"use client"

import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Package,
  ArrowUpRight,
  MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const STATS = [
  { 
    name: "Revenue Valuation", 
    value: "$142,890", 
    change: "+12.5%", 
    trend: "up", 
    icon: DollarSign,
    desc: "Last 30 cycles"
  },
  { 
    name: "Active Dossiers", 
    value: "1,248", 
    change: "+18.2%", 
    trend: "up", 
    icon: ShoppingCart,
    desc: "Processed protocol"
  },
  { 
    name: "New Citizens", 
    value: "452", 
    change: "-4.1%", 
    trend: "down", 
    icon: Users,
    desc: "Verification rate"
  },
  { 
    name: "Inventory Status", 
    value: "86%", 
    change: "+2.4%", 
    trend: "up", 
    icon: Package,
    desc: "Preservation efficiency"
  },
]

const RECENT_ORDERS = [
  { id: "FR-9981", citizen: "Julian V.", item: "Velvet Monolith", total: "$3,499", status: "Transit", date: "2h ago" },
  { id: "FR-9980", citizen: "Elena K.", item: "Prism Pendant", total: "$899", status: "Processing", date: "4h ago" },
  { id: "FR-9979", citizen: "Marcus T.", item: "Axis Table", total: "$1,299", status: "Delivered", date: "6h ago" },
  { id: "FR-9978", citizen: "Sophia L.", item: "Ceramic Vase", total: "$120", status: "Transit", date: "1d ago" },
]

export default function AdminOverview() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black tracking-tight">System Intelligence</h2>
        <p className="text-zinc-500 font-medium text-xs uppercase tracking-widest">Global metrics and real-time operational status.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <Card key={stat.name} className="border-0 shadow-xl shadow-zinc-200/50 rounded-2xl bg-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-950">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black tracking-widest uppercase",
                  stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                )}>
                  {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{stat.name}</p>
                <p className="text-2xl font-black tracking-tighter">{stat.value}</p>
              </div>
              <p className="mt-4 text-[9px] font-bold text-zinc-400 uppercase tracking-widest border-t border-zinc-50 pt-3">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black uppercase tracking-widest">Active Dossiers</h3>
            <Button variant="ghost" className="text-xs font-black uppercase tracking-widest">View All Protocol</Button>
          </div>
          <div className="bg-white rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-50">
                <TableRow className="border-zinc-100">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">ID</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Citizen</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Item</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Valuation</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Status</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12 text-right px-6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_ORDERS.map((order) => (
                  <TableRow key={order.id} className="border-zinc-50 hover:bg-zinc-50 transition-colors">
                    <TableCell className="font-black text-xs px-6 py-4">{order.id}</TableCell>
                    <TableCell className="font-bold text-xs">{order.citizen}</TableCell>
                    <TableCell className="font-medium text-xs text-zinc-500">{order.item}</TableCell>
                    <TableCell className="font-black text-xs">{order.total}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn(
                        "text-[9px] font-black uppercase tracking-widest h-5 px-2",
                        order.status === "Delivered" && "bg-emerald-100 text-emerald-700",
                        order.status === "Transit" && "bg-blue-100 text-blue-700",
                        order.status === "Processing" && "bg-amber-100 text-amber-700"
                      )}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Intelligence Breakdown */}
        <div className="space-y-6">
          <h3 className="text-xl font-black uppercase tracking-widest">Inventory Health</h3>
          <div className="space-y-4">
            {[
              { label: "Living Collection", value: 85, color: "bg-zinc-950" },
              { label: "Architectural Lighting", value: 62, color: "bg-zinc-700" },
              { label: "Dining Systems", value: 45, color: "bg-zinc-500" },
              { label: "Textile Archives", value: 92, color: "bg-zinc-300" },
            ].map((item) => (
              <div key={item.label} className="p-6 rounded-2xl bg-white shadow-lg shadow-zinc-200/20 border border-zinc-100 space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{item.label}</p>
                    <p className="text-lg font-black tracking-tight">{item.value}% Capacity</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400" />
                </div>
                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...inputs: unknown[]) {
  return inputs.filter(Boolean).join(" ")
}
