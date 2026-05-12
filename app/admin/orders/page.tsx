"use client"

import * as React from "react"
import { 
  Search, 
  MoreHorizontal, 
  Eye, 
  Truck, 
  CheckCircle,
  FileText,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ORDERS = [
  { id: "FR-9981", citizen: "Julian V.", items: 2, total: "$4,798", status: "Transit", date: "May 12, 10:30" },
  { id: "FR-9980", citizen: "Elena K.", items: 1, total: "$899", status: "Processing", date: "May 12, 09:15" },
  { id: "FR-9979", citizen: "Marcus T.", items: 3, total: "$2,150", status: "Delivered", date: "May 11, 14:45" },
  { id: "FR-9978", citizen: "Sophia L.", items: 1, total: "$120", status: "Transit", date: "May 11, 11:20" },
  { id: "FR-9977", citizen: "Dorian S.", items: 5, total: "$8,200", status: "Payment Error", date: "May 10, 16:00" },
]

export default function AdminOrdersPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight uppercase tracking-widest">Global Dossiers</h2>
          <p className="text-zinc-500 font-medium text-xs uppercase tracking-widest">Real-time oversight of all architectural transactions.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-14 rounded-2xl px-6 font-black uppercase tracking-widest text-[10px] border-2">
            Export Manifest
          </Button>
          <Button className="h-14 rounded-2xl px-8 font-black uppercase tracking-[0.2em] shadow-xl shadow-zinc-900/20">
            Advanced Analytics
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-grow max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input placeholder="Search dossiers by ID or citizen..." className="h-12 pl-12 rounded-xl bg-white border-zinc-200" />
          </div>
          <Button variant="outline" className="h-12 rounded-xl border-zinc-200 font-black uppercase tracking-widest text-[10px]">
            Status <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
          <Button variant="outline" className="h-12 rounded-xl border-zinc-200 font-black uppercase tracking-widest text-[10px]">
            Date Range <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-50">
              <TableRow className="border-zinc-100">
                <TableHead className="text-[10px] font-black uppercase tracking-widest px-8 h-14">Dossier ID</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Citizen</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Items</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Valuation</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Timestamp</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest h-14 text-right px-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ORDERS.map((order) => (
                <TableRow key={order.id} className="border-zinc-50 hover:bg-zinc-50 transition-colors">
                  <TableCell className="px-8 py-5 font-black text-xs">{order.id}</TableCell>
                  <TableCell className="font-bold text-xs">{order.citizen}</TableCell>
                  <TableCell className="text-xs font-medium text-zinc-500">{order.items} Pieces</TableCell>
                  <TableCell className="font-black text-sm tracking-tighter">{order.total}</TableCell>
                  <TableCell className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{order.date}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn(
                      "text-[9px] font-black uppercase tracking-widest h-5 px-2",
                      order.status === "Delivered" && "bg-emerald-100 text-emerald-700",
                      order.status === "Transit" && "bg-blue-100 text-blue-700",
                      order.status === "Processing" && "bg-amber-100 text-amber-700",
                      order.status === "Payment Error" && "bg-red-100 text-red-700"
                    )}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl border-zinc-200 p-2 shadow-2xl">
                        <DropdownMenuItem className="rounded-lg font-black uppercase tracking-widest text-[10px] py-3 cursor-pointer">
                          <Eye className="mr-2 h-3.5 w-3.5" /> Inspect Dossier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg font-black uppercase tracking-widest text-[10px] py-3 cursor-pointer">
                          <Truck className="mr-2 h-3.5 w-3.5" /> Update Logistics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg font-black uppercase tracking-widest text-[10px] py-3 cursor-pointer">
                          <FileText className="mr-2 h-3.5 w-3.5" /> Generate Invoice
                        </DropdownMenuItem>
                        <div className="my-2 border-t border-zinc-100" />
                        <DropdownMenuItem className="rounded-lg font-black uppercase tracking-widest text-[10px] py-3 cursor-pointer text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                          <CheckCircle className="mr-2 h-3.5 w-3.5" /> Mark Delivered
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

function cn(...inputs: unknown[]) {
  return inputs.filter(Boolean).join(" ")
}
