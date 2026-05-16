import * as React from "react"
import Link from "next/link"
import { 
  Search, 
  Filter, 
  Eye, 
  Truck, 
  PackageCheck, 
  XCircle,
  Clock,
  MapPin,
  User
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
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { getAllOrders } from "@/lib/actions/order"
import { getOrdersByStatus } from "@/lib/actions/analytics"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { OrderStatusActions } from "@/components/admin/order-status-actions"
import { ShippingAddress } from "@/types"

export default async function AdminOrdersPage({
  searchParams
}: {
  searchParams: Promise<{ query?: string; page?: string; status?: string }>
}) {
  const { query, page, status } = await searchParams
  const currentPage = Number(page) || 1

  const { orders, pages } = await getAllOrders({ query, page: currentPage, status })
  const statusCounts = await getOrdersByStatus()

  const getStatusCount = (s: string) => {
    const found = statusCounts.find((sc) => sc.status === s)
    return found?.count ?? 0
  }

  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold tracking-tight">Order Logistics</h2>
          <p className="text-zinc-500 font-medium text-xs uppercase tracking-[0.2em]">Monitor fulfillment status and global transaction lifecycle</p>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 px-6 rounded-2xl border-zinc-200 bg-white shadow-sm font-bold text-[10px] uppercase tracking-widest gap-2">
                <Filter className="h-4 w-4" />
                {status || "All Statuses"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-2xl border-0 shadow-2xl p-2">
              <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 py-2">Filter by Status</DropdownMenuLabel>
              <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-bold focus:bg-zinc-50 cursor-pointer" asChild>
                <Link href="/admin/orders">All Statuses</Link>
              </DropdownMenuItem>
              {["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => (
                <DropdownMenuItem key={s} className="rounded-xl px-3 py-2 text-xs font-bold focus:bg-zinc-50 cursor-pointer" asChild>
                  <Link href={`/admin/orders?status=${s}`}>{s}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white p-8 group hover:scale-[1.02] transition-all duration-500">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Pending</p>
              <p className="text-3xl font-bold">{getStatusCount("PENDING")}</p>
            </div>
          </div>
        </Card>
        <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white p-8 group hover:scale-[1.02] transition-all duration-500">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Transit</p>
              <p className="text-3xl font-bold">{getStatusCount("SHIPPED")}</p>
            </div>
          </div>
        </Card>
        <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white p-8 group hover:scale-[1.02] transition-all duration-500">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">
              <PackageCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Delivered</p>
              <p className="text-3xl font-bold">{getStatusCount("DELIVERED")}</p>
            </div>
          </div>
        </Card>
        <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white p-8 group hover:scale-[1.02] transition-all duration-500">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 shadow-sm">
              <XCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Cancelled</p>
              <p className="text-3xl font-bold">{getStatusCount("CANCELLED")}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white overflow-hidden">
        <div className="p-8 border-b border-zinc-50 bg-zinc-50/30">
          <form action="/admin/orders" className="relative group w-full md:w-[450px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-950 transition-colors" />
            <Input 
              name="query"
              defaultValue={query}
              placeholder="Search by ID, customer name, or email..." 
              className="w-full pl-11 pr-4 h-14 rounded-2xl border border-zinc-200 bg-white focus:shadow-xl focus:border-zinc-300 transition-all text-sm font-medium"
            />
          </form>
        </div>

        <Table>
          <TableHeader className="bg-zinc-50/50">
            <TableRow className="border-zinc-100 hover:bg-transparent">
              <TableHead className="text-[11px] font-bold uppercase tracking-widest px-8 h-20">Order Identifier</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-widest h-20">Customer</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-widest h-20">Logistics Status</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-widest h-20">Amount</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-widest h-20">Transaction Date</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-widest h-20 text-right px-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-zinc-50 hover:bg-zinc-50/50 transition-colors group">
                <TableCell className="px-8 py-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-zinc-950 uppercase">#ORD-{order.id.slice(-8).toUpperCase()}</span>
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{order.paymentMethod}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-400 text-[10px] font-bold">
                      {order.user?.name?.charAt(0) || "C"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">{order.user?.name || "Guest Customer"}</span>
                      <span className="text-[10px] font-medium text-zinc-400 lowercase">{order.user?.email || "N/A"}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={cn(
                    "text-[9px] font-bold uppercase tracking-widest h-6 px-3 rounded-lg border-0 shadow-sm",
                    order.status === "DELIVERED" && "bg-emerald-50 text-emerald-600",
                    order.status === "SHIPPED" && "bg-blue-50 text-blue-600",
                    order.status === "PROCESSING" && "bg-amber-50 text-amber-600",
                    order.status === "PENDING" && "bg-zinc-100 text-zinc-600",
                    order.status === "CANCELLED" && "bg-red-50 text-red-600"
                  )}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-bold text-zinc-950">${Number(order.total).toLocaleString()}</span>
                </TableCell>
                <TableCell>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    {format(new Date(order.createdAt), "MMM d, h:mm a")}
                  </span>
                </TableCell>
                <TableCell className="text-right px-8">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-md transition-all">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-xl rounded-l-[3rem] border-0 shadow-2xl p-0">
                      <div className="h-full overflow-y-auto p-12 space-y-12">
                        <SheetHeader className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-zinc-950 text-white text-[10px] font-bold uppercase tracking-widest h-6 px-3 rounded-lg">
                              Order Details
                            </Badge>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                              {format(new Date(order.createdAt), "MMMM d, yyyy")}
                            </span>
                          </div>
                          <SheetTitle className="text-3xl font-bold tracking-tight uppercase">#ORD-{order.id.slice(-8).toUpperCase()}</SheetTitle>
                          <SheetDescription className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                            Transaction processed via {order.paymentMethod}
                          </SheetDescription>
                        </SheetHeader>

                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                              <User className="h-3.5 w-3.5" />
                              Customer Info
                            </h4>
                            <div className="p-6 rounded-3xl bg-zinc-50 space-y-2 border border-zinc-100 shadow-sm">
                              <p className="text-sm font-bold">{order.user?.name || "Guest Customer"}</p>
                              <p className="text-[10px] font-medium text-zinc-400">{order.user?.email || "N/A"}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                              <MapPin className="h-3.5 w-3.5" />
                              Delivery Destination
                            </h4>
                            <div className="p-6 rounded-3xl bg-zinc-50 space-y-2 border border-zinc-100 shadow-sm">
                              <p className="text-[10px] leading-relaxed font-bold uppercase tracking-wider text-zinc-600">
                                {(order.shippingAddress as unknown as ShippingAddress)?.address}, {(order.shippingAddress as unknown as ShippingAddress)?.city}
                                <br />
                                {(order.shippingAddress as unknown as ShippingAddress)?.state}, {(order.shippingAddress as unknown as ShippingAddress)?.postalCode}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Inventory Items</h4>
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl border border-zinc-100 hover:bg-zinc-50 transition-colors">
                                <div className="flex items-center gap-4">
                                  <div className="h-14 w-14 rounded-xl bg-zinc-100 overflow-hidden">
                                    {item.product.images?.[0] && <img src={item.product.images[0]} alt="" className="h-full w-full object-cover" />}
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs font-bold">{item.product.name}</p>
                                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Qty: {item.quantity} × ${Number(item.price)}</p>
                                  </div>
                                </div>
                                <span className="text-xs font-bold">${(item.quantity * Number(item.price)).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-8 border-t border-zinc-100 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Tax & Surcharge</span>
                            <span className="text-xs font-bold">$0.00</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Shipping</span>
                            <span className="text-xs font-bold text-emerald-600 uppercase">Complimentary</span>
                          </div>
                          <div className="flex items-center justify-between pt-4">
                            <span className="text-sm font-bold uppercase tracking-widest">Total Valuation</span>
                            <span className="text-2xl font-bold tracking-tight">${Number(order.total).toLocaleString()}</span>
                          </div>
                        </div>

                        <OrderStatusActions orderId={order.id} currentStatus={order.status} />
                      </div>
                    </SheetContent>
                  </Sheet>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-8 border-t border-zinc-50 bg-zinc-50/30 flex items-center justify-between">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Fulfillment Ledger | {orders.length} total records</p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 rounded-xl border-zinc-200 text-[10px] font-bold uppercase tracking-widest disabled:opacity-30" 
              asChild
              disabled={currentPage <= 1}
            >
              <Link href={`/admin/orders?page=${currentPage - 1}${query ? `&query=${query}` : ""}${status ? `&status=${status}` : ""}`}>Previous</Link>
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === currentPage ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-10 w-10 rounded-xl text-[10px] font-bold",
                    p === currentPage ? "bg-zinc-950 text-white" : "border-zinc-200"
                  )}
                  asChild
                >
                  <Link href={`/admin/orders?page=${p}${query ? `&query=${query}` : ""}${status ? `&status=${status}` : ""}`}>{p}</Link>
                </Button>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 rounded-xl border-zinc-200 text-[10px] font-bold uppercase tracking-widest disabled:opacity-30" 
              asChild
              disabled={currentPage >= pages}
            >
              <Link href={`/admin/orders?page=${currentPage + 1}${query ? `&query=${query}` : ""}${status ? `&status=${status}` : ""}`}>Next Page</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
