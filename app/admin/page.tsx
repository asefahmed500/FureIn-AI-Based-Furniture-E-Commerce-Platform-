import Link from "next/link"
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  MoreHorizontal,
  LayoutGrid
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
import { getSalesStats, getRevenueTrends, getTopProducts } from "@/lib/actions/analytics"
import { getAllOrders } from "@/lib/actions/order"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

export default async function AdminOverview() {
  const [stats, , topProducts, ordersData] = await Promise.all([
    getSalesStats(),
    getRevenueTrends(),
    getTopProducts(),
    getAllOrders()
  ])

  const recentOrders = ordersData.orders || []

  const displayStats = [
    { 
      name: "Total Revenue", 
      value: `$${Number(stats.totalRevenue).toLocaleString()}`,
      change: `+${stats.revenueChange}%`, 
      icon: DollarSign, 
      desc: "Gross volume this month",
      trend: "up"
    },
    { 
      name: "Active Orders", 
      value: stats.activeOrders.toString(), 
      change: `+${stats.ordersChange}%`, 
      icon: ShoppingCart, 
      desc: "Pending processing",
      trend: "up"
    },
    { 
      name: "Total Customers", 
      value: stats.totalCustomers.toString(), 
      change: `+${stats.customersChange}%`, 
      icon: Users, 
      desc: "Registered users",
      trend: "up"
    },
    { 
      name: "Avg. Order Value", 
      value: `$${Math.round(Number(stats.totalRevenue) / (stats.totalOrders || 1))}`,
      change: "Stable", 
      icon: LayoutGrid, 
      desc: "Per transaction",
      trend: "up"
    },
  ]

  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-bold tracking-tight">Executive Dashboard</h2>
        <p className="text-zinc-500 font-medium text-xs uppercase tracking-[0.2em]">Real-time enterprise intelligence & performance metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayStats.map((stat) => (
          <Card key={stat.name} className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white overflow-hidden group hover:scale-[1.02] transition-all duration-500">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="h-14 w-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-950 group-hover:bg-zinc-950 group-hover:text-white transition-all duration-500 shadow-sm">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {stat.change}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">{stat.name}</p>
                <p className="text-4xl font-bold tracking-tight">{stat.value}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-zinc-50">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{stat.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold uppercase tracking-widest">Recent Transactions</h3>
            <Button variant="link" className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-950 transition-colors" asChild>
              <Link href="/admin/orders">Explore All Orders</Link>
            </Button>
          </div>
          <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white overflow-hidden border border-zinc-100">
            <Table>
              <TableHeader className="bg-zinc-50/50">
                <TableRow className="border-zinc-100 hover:bg-transparent">
                  <TableHead className="text-[11px] font-bold uppercase tracking-widest px-8 h-16">Transaction ID</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-widest h-16">Client</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-widest h-16">Amount</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-widest h-16">Date</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-widest h-16">Status</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-widest h-16 text-right px-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.slice(0, 6).map((order: any) => (
                  <TableRow key={order.id} className="border-zinc-50 hover:bg-zinc-50/50 transition-colors group">
                    <TableCell className="font-bold text-xs px-8 py-6">
                      <span className="text-zinc-400 font-medium">#</span>
                      {order.id.slice(-8).toUpperCase()}
                    </TableCell>
                    <TableCell className="font-bold text-xs">
                      {order.user?.name || "Private Client"}
                    </TableCell>
                    <TableCell className="font-bold text-xs">
                      ${Number(order.total).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn(
                        "text-[9px] font-bold uppercase tracking-widest h-6 px-3 rounded-lg border-0",
                        order.status === "DELIVERED" && "bg-emerald-50 text-emerald-600",
                        order.status === "SHIPPED" && "bg-blue-50 text-blue-600",
                        order.status === "PROCESSING" && "bg-amber-50 text-amber-600",
                        order.status === "PENDING" && "bg-zinc-100 text-zinc-600",
                        order.status === "CANCELLED" && "bg-red-50 text-red-600"
                      )}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Top Products */}
        <div className="space-y-8">
          <h3 className="text-xl font-bold uppercase tracking-widest px-2">Top Performance</h3>
          <div className="space-y-6">
            {topProducts.slice(0, 4).map((item: any, idx: number) => (
              <Card key={item.id} className="border-0 shadow-xl shadow-zinc-200/30 rounded-3xl bg-white group hover:scale-[1.05] transition-all duration-500 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center gap-6 p-6">
                    <div className="relative h-20 w-20 rounded-2xl bg-zinc-100 flex-shrink-0 overflow-hidden shadow-inner">
                      {item.images?.[0] && (
                        <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      )}
                      <div className="absolute top-0 left-0 h-6 w-6 bg-zinc-950 flex items-center justify-center text-[10px] font-bold text-white rounded-br-xl">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex-grow min-w-0 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 truncate">{item.category?.name}</p>
                      <h4 className="text-sm font-bold truncate pr-4">{item.name}</h4>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs font-bold text-zinc-950">${Number(item.price).toLocaleString()}</p>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{item._count.orderItems} Sales</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-50 overflow-hidden">
                    <div 
                      className="h-full bg-zinc-950 transition-all duration-1000" 
                      style={{ width: `${Math.min(100, (item._count.orderItems / (topProducts[0]._count.orderItems || 1)) * 100)}%` }} 
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

