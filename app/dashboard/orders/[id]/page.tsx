import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Truck,
  CreditCard,
  Download,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getOrderById } from "@/lib/actions/order"
import { ShippingAddress } from "@/types"

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

function getStatusLabel(status: string) {
  const map: Record<string, string> = {
    PENDING: "Pending",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  }
  return map[status] ?? status
}

function getStatusColor(status: string) {
  const map: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  }
  return map[status] ?? "bg-gray-100 text-gray-800"
}

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getOrderById(id)

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-black tracking-tighter">Order Not Found</h1>
        <p className="text-sm text-muted-foreground font-bold">
          We couldn&apos;t locate this order in our archives.
        </p>
        <Button asChild variant="outline" className="h-12 rounded-xl border-2 font-black uppercase tracking-widest text-xs px-6">
          <Link href="/dashboard/orders">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Link>
        </Button>
      </div>
    )
  }

  const shippingAddress = order.shippingAddress as ShippingAddress | null
  const subtotal = order.items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)

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
            <h1 className="text-4xl font-black tracking-tighter">Order {order.id.slice(-8).toUpperCase()}</h1>
            <Badge className={`${getStatusColor(order.status)} font-black uppercase tracking-widest text-[10px] px-3 h-6 border-0`}>
              {getStatusLabel(order.status)}
            </Badge>
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">
            Protocol Initiated: {formatDate(order.createdAt)}
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
        {/* Left Col: Items */}
        <div className="lg:col-span-2 space-y-12">
          {/* Items */}
          <section className="space-y-8">
            <h3 className="text-xl font-black uppercase tracking-widest border-b border-border/50 pb-4">Architectural Manifest</h3>
            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-8 group">
                  <div className="relative h-32 w-32 rounded-2xl overflow-hidden bg-secondary/10 flex-shrink-0">
                    {item.product.images?.[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                        <HelpCircle className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center flex-grow">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="text-xl font-black tracking-tight uppercase tracking-widest">{item.product.name}</h4>
                        {item.variant && (
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.variant}</p>
                        )}
                      </div>
                      <p className="text-xl font-black tracking-tighter">{formatCurrency(Number(item.price))}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Quantity: <span className="text-foreground">{item.quantity}</span></p>
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
              {shippingAddress && (
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Address</p>
                  <p className="text-sm font-bold leading-relaxed">
                    {shippingAddress.firstName} {shippingAddress.lastName}<br />
                    {shippingAddress.address}{shippingAddress.apartment ? `, ${shippingAddress.apartment}` : ""}<br />
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}<br />
                    {shippingAddress.country}
                  </p>
                </div>
              )}
              {order.paymentMethod && (
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Payment Method</p>
                  <p className="text-sm font-bold">{order.paymentMethod}</p>
                </div>
              )}
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
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="pt-4 mt-4 border-t border-border/50 flex justify-between items-end">
                <span className="text-sm font-black uppercase tracking-widest">Total Valuation</span>
                <span className="text-2xl font-black tracking-tighter">{formatCurrency(Number(order.total))}</span>
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
