import * as React from "react"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users,
  Calendar,
  Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  getSalesStats, 
  getRevenueByMonth, 
  getOrdersByStatus, 
  getTopProducts 
} from "@/lib/actions/analytics"
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts"
import { cn } from "@/lib/utils"

export default async function AdminAnalyticsPage() {
  const [stats, revenueData, statusData, topProducts] = await Promise.all([
    getSalesStats(),
    getRevenueByMonth(),
    getOrdersByStatus(),
    getTopProducts()
  ])

  const deliveredCount = statusData.find(s => s.status === "DELIVERED")?.count ?? 0
  const totalNonCancelled = statusData.reduce((sum, s) => s.status !== "CANCELLED" ? sum + s.count : sum, 0)
  const fulfillmentRate = totalNonCancelled > 0 ? Math.round((deliveredCount / totalNonCancelled) * 1000) / 10 : 0

  const lastMonthCustomersNew = stats.totalCustomers - stats.customersChange

  const kpiStats = [
    { 
      label: "Gross Revenue", 
      value: `$${stats.totalRevenue.toLocaleString()}`, 
      growth: stats.revenueGrowth,
      icon: DollarSign,
      color: "zinc"
    },
    { 
      label: "Fulfillment Rate", 
      value: `${fulfillmentRate}%`, 
      growth: fulfillmentRate >= 95 ? 2.1 : -1.3,
      icon: ShoppingCart,
      color: "emerald"
    },
    { 
      label: "Inventory Value", 
      value: `$${(stats.totalProducts * 450).toLocaleString()}`,
      growth: -0.4,
      icon: Package,
      color: "blue"
    },
    { 
      label: "Client Acquisition", 
      value: stats.totalCustomers.toString(), 
      growth: stats.customersChange,
      icon: Users,
      color: "zinc"
    },
  ]

  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold tracking-tight">Financial Intelligence</h2>
          <p className="text-zinc-500 font-medium text-xs uppercase tracking-[0.2em]">Comprehensive market performance and transactional analytics</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="h-12 px-6 rounded-2xl border-zinc-200 bg-white shadow-sm font-bold text-[10px] uppercase tracking-widest gap-2">
            <Calendar className="h-4 w-4" />
            Last 6 Months
          </Button>
          <Button className="h-12 px-6 rounded-2xl bg-zinc-950 text-white hover:bg-zinc-800 transition-all gap-2">
            <Download className="h-4 w-4" />
            Download PDF Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {kpiStats.map((kpi) => (
          <Card key={kpi.label} className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white p-8 group hover:scale-[1.02] transition-all duration-500">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm",
                  kpi.color === "zinc" && "bg-zinc-50 text-zinc-950 group-hover:bg-zinc-950 group-hover:text-white",
                  kpi.color === "emerald" && "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
                  kpi.color === "blue" && "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                )}>
                  <kpi.icon className="h-5 w-5" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider",
                  kpi.growth >= 0 ? "text-emerald-600" : "text-red-600"
                )}>
                  {kpi.growth >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {Math.abs(kpi.growth)}%
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{kpi.label}</p>
                <p className="text-3xl font-bold">{kpi.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Charts Area */}
      <AnalyticsCharts revenueData={revenueData} statusData={statusData} />

      {/* Top Products Table */}
      <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white overflow-hidden">
        <div className="p-8 border-b border-zinc-50 bg-zinc-50/30">
          <h3 className="text-xl font-bold uppercase tracking-widest">Asset Performance</h3>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Highest grossing inventory by revenue and volume</p>
        </div>
        <div className="p-0">
          <table className="w-full text-left">
            <thead className="bg-zinc-50/50">
              <tr>
                <th className="text-[11px] font-bold uppercase tracking-widest px-8 h-16">Product Asset</th>
                <th className="text-[11px] font-bold uppercase tracking-widest h-16">Category</th>
                <th className="text-[11px] font-bold uppercase tracking-widest h-16">Total Sold</th>
                <th className="text-[11px] font-bold uppercase tracking-widest h-16">Gross Revenue</th>
                <th className="text-[11px] font-bold uppercase tracking-widest h-16 px-8 text-right">Contribution</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.id} className="border-t border-zinc-50 hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-zinc-100 overflow-hidden shadow-inner">
                        {product.images?.[0] && <img src={product.images[0]} alt="" className="h-full w-full object-cover" />}
                      </div>
                      <span className="text-xs font-bold">{product.name}</span>
                    </div>
                  </td>
                  <td className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{product.category?.name}</td>
                  <td className="text-xs font-bold">{product.totalSold} Units</td>
                  <td className="text-xs font-bold text-zinc-950">${product.totalRevenue.toLocaleString()}</td>
                  <td className="px-8 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <div className="w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-zinc-950 transition-all duration-1000" 
                          style={{ width: `${product.contribution ?? 0}%` }} 
                        />
                      </div>
                      <span className="text-[10px] font-bold">{product.contribution ?? 0}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
