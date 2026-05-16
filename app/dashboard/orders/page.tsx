import { getUserOrders } from "@/lib/actions/order"
import { Package, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default async function OrdersPage() {
  const orders = await getUserOrders()

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-4xl font-black tracking-tight">Order Dossier</h1>
        <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
          Comprehensive ledger of your architectural acquisitions.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border/50 p-20 flex flex-col items-center justify-center text-center">
          <Package className="h-12 w-12 text-muted-foreground/20 mb-4" />
          <p className="font-bold text-muted-foreground uppercase tracking-[0.2em] text-xs">
            No transactions recorded in the architectural ledger.
          </p>
          <Link href="/shop" className="mt-6 text-xs font-black uppercase tracking-widest text-primary hover:underline">
            Begin Your Collection
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link 
              key={order.id} 
              href={`/dashboard/orders/${order.id}`}
              className="block group p-6 rounded-2xl border border-border/50 bg-secondary/5 hover:bg-secondary/10 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-background flex items-center justify-center border border-border/50">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
                      Order ID: <span className="text-foreground">{order.id.slice(-8).toUpperCase()}</span>
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <Clock className="h-3 w-3" />
                      {new Date(order.createdAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-right mr-4">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Amount</p>
                    <p className="font-black">${Number(order.total).toFixed(2)}</p>
                  </div>
                  <Badge className="h-8 rounded-lg font-black uppercase tracking-widest text-[10px] px-3">
                    {order.status}
                  </Badge>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
