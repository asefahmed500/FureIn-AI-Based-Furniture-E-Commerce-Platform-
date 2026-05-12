"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { 
  ArrowLeft, 
  Truck, 
  CreditCard, 
  Download, 
  HelpCircle,
  Clock,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const ORDER_DATA = {
  id: "FR-2024-9981",
  date: "May 12, 2024",
  status: "In Transit",
  items: [
    {
      id: "p1",
      name: "VELVET MONOLITH",
      variant: "Onyx Black",
      price: 3499,
      quantity: 1,
      image: "/products/velvet-sofa.png"
    },
    {
      id: "p5",
      name: "AXIS COFFEE TABLE",
      variant: "Walnut",
      price: 1299,
      quantity: 1,
      image: "/products/coffee-table.png"
    }
  ],
  shipping: {
    method: "Architectural White Glove",
    address: "77 Modernist Way, Floor 4\nDesign District, CA 90210\nUnited States",
    tracking: "FR-9981-TRK-Z"
  },
  payment: {
    method: "Visa ending in 4421",
    subtotal: 4798,
    shipping: 150,
    tax: 383,
    total: 5331
  },
  timeline: [
    { status: "Order Placed", date: "May 12, 10:30 AM", active: true },
    { status: "Quality Preservation", date: "May 12, 02:45 PM", active: true },
    { status: "Dispatched", date: "May 13, 08:00 AM", active: true },
    { status: "In Transit", date: "In Progress", active: true },
    { status: "Delivered", date: "Estimated May 15", active: false },
  ]
}

export default function OrderDetailsPage() {
  const params = useParams()
  const orderId = params.id as string

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-border/50 pb-8">
        <div className="space-y-4">
          <Button asChild variant="ghost" className="px-0 hover:bg-transparent text-muted-foreground hover:text-primary font-black uppercase tracking-widest text-[10px]">
            <Link href="/dashboard/orders">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dossiers
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-black tracking-tighter">Order {orderId}</h1>
            <Badge className="bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] px-3 h-6">
              {ORDER_DATA.status}
            </Badge>
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">
            Protocol Initiated: {ORDER_DATA.date}
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-12 rounded-xl border-2 font-black uppercase tracking-widest text-xs px-6">
            <Download className="mr-2 h-4 w-4" /> Invoice
          </Button>
          <Button className="h-12 rounded-xl font-black uppercase tracking-widest text-xs px-6 shadow-lg shadow-primary/20">
            Track Shipment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Col: Items & Payment */}
        <div className="lg:col-span-2 space-y-12">
          {/* Timeline */}
          <section className="p-8 rounded-3xl bg-secondary/5 border border-border/50 space-y-8">
            <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> Delivery Protocol
            </h3>
            <div className="relative flex justify-between items-start pt-4">
              {ORDER_DATA.timeline.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center gap-4 relative z-10 w-full">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step.active ? 'bg-primary border-primary text-primary-foreground' : 'bg-white border-border text-muted-foreground'}`}>
                    {step.active ? <CheckCircle2 className="h-6 w-6" /> : <div className="h-2 w-2 rounded-full bg-border" />}
                  </div>
                  <div className="space-y-1">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${step.active ? 'text-foreground' : 'text-muted-foreground/50'}`}>{step.status}</p>
                    <p className="text-[9px] font-bold text-muted-foreground">{step.date}</p>
                  </div>
                  {idx < ORDER_DATA.timeline.length - 1 && (
                    <div className={`absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[2px] -z-10 ${ORDER_DATA.timeline[idx+1].active ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Items */}
          <section className="space-y-8">
            <h3 className="text-xl font-black uppercase tracking-widest border-b border-border/50 pb-4">Architectural Manifest</h3>
            <div className="space-y-6">
              {ORDER_DATA.items.map((item) => (
                <div key={item.id} className="flex gap-8 group">
                  <div className="relative h-32 w-32 rounded-2xl overflow-hidden bg-secondary/10 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex flex-col justify-center flex-grow">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="text-xl font-black tracking-tight uppercase tracking-widest">{item.name}</h4>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.variant}</p>
                      </div>
                      <p className="text-xl font-black tracking-tighter">${item.price}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Quantity: <span className="text-foreground">{item.quantity}</span></p>
                      <Button variant="link" className="h-auto p-0 text-[10px] font-black uppercase tracking-widest">Reorder Piece</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Col: Summaries */}
        <div className="space-y-8">
          {/* Shipping Card */}
          <div className="p-8 rounded-3xl bg-white border-2 border-border/50 space-y-6 shadow-xl shadow-primary/5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-black uppercase tracking-widest text-sm">Logistics</h4>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Address</p>
                <p className="text-sm font-bold leading-relaxed whitespace-pre-line">{ORDER_DATA.shipping.address}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Method</p>
                <p className="text-sm font-bold">{ORDER_DATA.shipping.method}</p>
              </div>
              <div className="pt-4 p-4 rounded-xl bg-secondary/10 border border-border/50">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Tracking ID</p>
                <p className="text-xs font-black tracking-widest font-mono">{ORDER_DATA.shipping.tracking}</p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="p-8 rounded-3xl bg-secondary text-secondary-foreground space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <CreditCard className="h-5 w-5" />
              <h4 className="font-black uppercase tracking-widest text-sm text-foreground">Fiscal Overview</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="text-muted-foreground">Manifest Total</span>
                <span>${ORDER_DATA.payment.subtotal}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="text-muted-foreground">Logistics Fee</span>
                <span>${ORDER_DATA.payment.shipping}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="text-muted-foreground">Regulatory Tax</span>
                <span>${ORDER_DATA.payment.tax}</span>
              </div>
              <div className="pt-4 mt-4 border-t border-border/50 flex justify-between items-end">
                <span className="text-sm font-black uppercase tracking-widest">Total Valuation</span>
                <span className="text-2xl font-black tracking-tighter">${ORDER_DATA.payment.total}</span>
              </div>
            </div>
            <div className="pt-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 text-primary" /> Fully Liquidated via {ORDER_DATA.payment.method}
              </div>
            </div>
          </div>

          {/* Support */}
          <Button variant="ghost" className="w-full h-14 rounded-2xl border border-border/50 font-black uppercase tracking-widest text-[10px]">
            <HelpCircle className="mr-2 h-4 w-4" /> Architectural Inquiries
          </Button>
        </div>
      </div>
    </div>
  )
}
