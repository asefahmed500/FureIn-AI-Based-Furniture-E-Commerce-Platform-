"use client"

import * as React from "react"
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Pie,
  PieChart,
  Cell,
  Area,
  AreaChart
} from "recharts"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface AnalyticsChartsProps {
  revenueData: any[]
  statusData: any[]
}

const revenueConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--muted-foreground))",
  }
} satisfies ChartConfig

const statusConfig = {
  PENDING: { label: "Pending", color: "#71717a" },
  PROCESSING: { label: "Processing", color: "#f59e0b" },
  SHIPPED: { label: "Shipped", color: "#3b82f6" },
  DELIVERED: { label: "Delivered", color: "#10b981" },
  CANCELLED: { label: "Cancelled", color: "#ef4444" },
} satisfies ChartConfig

export function AnalyticsCharts({ revenueData, statusData }: AnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Revenue Area Chart */}
      <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white overflow-hidden">
        <CardHeader className="p-8 pb-0">
          <CardTitle className="text-xl font-bold uppercase tracking-widest">Revenue Growth</CardTitle>
          <CardDescription className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Performance metrics over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <ChartContainer config={revenueConfig} className="h-[350px] w-full">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(9, 9, 11)" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="rgb(9, 9, 11)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: "#a1a1aa" }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: "#a1a1aa" }}
                tickFormatter={(val) => `$${val}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="rgb(9, 9, 11)" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Orders Distribution Pie Chart */}
      <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white overflow-hidden">
        <CardHeader className="p-8 pb-0">
          <CardTitle className="text-xl font-bold uppercase tracking-widest">Order Fulfillment</CardTitle>
          <CardDescription className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Distribution across processing lifecycle</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <ChartContainer config={statusConfig} className="h-[350px] w-full">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={8}
                stroke="none"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={statusConfig[entry.status as keyof typeof statusConfig]?.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            </PieChart>
          </ChartContainer>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 px-4">
            {statusData.map((item) => (
              <div key={item.status} className="flex items-center gap-3">
                <div 
                  className="h-2.5 w-2.5 rounded-full" 
                  style={{ backgroundColor: statusConfig[item.status as keyof typeof statusConfig]?.color }}
                />
                <div className="space-y-0.5">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{item.status}</p>
                  <p className="text-xs font-bold">{item.count} Orders</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Volume Bar Chart */}
      <Card className="lg:col-span-2 border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white overflow-hidden">
        <CardHeader className="p-8 pb-0 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold uppercase tracking-widest">Transactional Volume</CardTitle>
            <CardDescription className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Aggregate order counts by monthly period</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <ChartContainer config={revenueConfig} className="h-[300px] w-full">
            <BarChart data={revenueData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: "#a1a1aa" }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: "#a1a1aa" }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="orders" 
                fill="rgb(9, 9, 11)" 
                radius={[8, 8, 0, 0]} 
                barSize={40}
                animationDuration={2000}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
