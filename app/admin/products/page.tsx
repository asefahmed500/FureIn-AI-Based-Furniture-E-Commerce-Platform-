"use client"

import * as React from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ExternalLink,
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

const INVENTORY = [
  { id: "P1", name: "Velvet Monolith", category: "LIVING", price: "$3,499", stock: 12, status: "Active" },
  { id: "P2", name: "Ethereal Lounge", category: "LIVING", price: "$2,899", stock: 8, status: "Active" },
  { id: "P3", name: "Axis Coffee Table", category: "LIVING", price: "$1,299", stock: 15, status: "Active" },
  { id: "P4", name: "Prism Pendant", category: "LIGHTING", price: "$899", stock: 0, status: "Out of Stock" },
  { id: "P5", name: "Ceramic Vase", category: "DECOR", price: "$120", stock: 45, status: "Active" },
  { id: "P6", name: "Zen Dining Table", category: "DINING", price: "$4,200", stock: 4, status: "Archived" },
]

export default function InventoryPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight uppercase tracking-widest">Inventory Archives</h2>
          <p className="text-zinc-500 font-medium text-xs uppercase tracking-widest">Catalog preservation and supply chain oversight.</p>
        </div>
        <Button className="h-14 rounded-2xl px-8 font-black uppercase tracking-[0.2em] shadow-xl shadow-zinc-900/20">
          <Plus className="mr-2 h-5 w-5" /> New Acquisition
        </Button>
      </div>

      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-grow max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input placeholder="Search inventory..." className="h-12 pl-12 rounded-xl bg-white border-zinc-200" />
          </div>
          <Button variant="outline" className="h-12 rounded-xl border-zinc-200 font-black uppercase tracking-widest text-[10px]">
            <Filter className="mr-2 h-4 w-4" /> Category <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
          <Button variant="outline" className="h-12 rounded-xl border-zinc-200 font-black uppercase tracking-widest text-[10px]">
            Status <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-50">
              <TableRow className="border-zinc-100">
                <TableHead className="text-[10px] font-black uppercase tracking-widest px-8 h-14">Artifact</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Identity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Category</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Valuation</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest h-14 text-center">In Stock</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Protocol Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest h-14 text-right px-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVENTORY.map((item) => (
                <TableRow key={item.id} className="border-zinc-50 hover:bg-zinc-50 transition-colors">
                  <TableCell className="px-8 py-5">
                    <div className="h-14 w-14 rounded-xl bg-zinc-100 flex items-center justify-center border border-zinc-200 overflow-hidden">
                      <div className="text-[10px] font-black uppercase text-zinc-400">{item.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-black text-xs uppercase tracking-widest">{item.name}</p>
                      <p className="text-[9px] font-bold text-zinc-400 font-mono tracking-tighter">REF: {item.id}-ARCHIVE</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-zinc-200 h-6 px-3">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-black text-sm tracking-tighter">{item.price}</TableCell>
                  <TableCell className="text-center">
                    <span className={cn(
                      "text-xs font-black",
                      item.stock === 0 ? "text-red-500" : item.stock < 10 ? "text-amber-500" : "text-zinc-950"
                    )}>
                      {item.stock} Units
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn(
                      "text-[9px] font-black uppercase tracking-widest h-5 px-2",
                      item.status === "Active" && "bg-emerald-100 text-emerald-700",
                      item.status === "Out of Stock" && "bg-red-100 text-red-700",
                      item.status === "Archived" && "bg-zinc-100 text-zinc-500"
                    )}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl border-zinc-200 p-2 shadow-2xl">
                        <DropdownMenuItem className="rounded-lg font-black uppercase tracking-widest text-[10px] py-3 cursor-pointer">
                          <Edit className="mr-2 h-3.5 w-3.5" /> Edit Blueprint
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg font-black uppercase tracking-widest text-[10px] py-3 cursor-pointer">
                          <ExternalLink className="mr-2 h-3.5 w-3.5" /> View Public
                        </DropdownMenuItem>
                        <div className="my-2 border-t border-zinc-100" />
                        <DropdownMenuItem className="rounded-lg font-black uppercase tracking-widest text-[10px] py-3 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="mr-2 h-3.5 w-3.5" /> Purge Record
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
