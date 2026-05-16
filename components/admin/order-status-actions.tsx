"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { updateOrderStatus } from "@/lib/actions/order"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { RefreshCw, Truck, CheckCircle2, XCircle, Package } from "lucide-react"

interface OrderStatusActionsProps {
  orderId: string
  currentStatus: string
}

export function OrderStatusActions({ orderId, currentStatus }: OrderStatusActionsProps) {
  const [isLoading, setIsLoading] = React.useState<string | null>(null)
  const router = useRouter()

  const handleUpdate = async (status: string) => {
    setIsLoading(status)
    try {
      const result = await updateOrderStatus(orderId, status)
      if (result.success) {
        toast.success(`Order ${orderId.slice(-8).toUpperCase()} updated to ${status}`)
        router.refresh()
      } else {
        toast.error("Failed to update status")
      }
    } catch {
      toast.error("An error occurred while updating status")
    } finally {
      setIsLoading(null)
    }
  }

  if (currentStatus === "CANCELLED" || currentStatus === "DELIVERED") {
    return (
      <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Lifecycle Completed</p>
        <p className="text-sm font-bold mt-1">This order is in a final state: {currentStatus}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Update Fulfillment Lifecycle</h4>
      <div className="grid grid-cols-2 gap-4">
        {currentStatus === "PENDING" && (
          <Button 
            variant="outline" 
            className="h-14 rounded-2xl border-zinc-200 font-bold text-[10px] uppercase tracking-widest hover:bg-amber-50 hover:text-amber-600 transition-all gap-2"
            onClick={() => handleUpdate("PROCESSING")}
            disabled={isLoading !== null}
          >
            {isLoading === "PROCESSING" ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Package className="h-4 w-4" />}
            Process Order
          </Button>
        )}
        <Button 
          variant="outline" 
          className="h-14 rounded-2xl border-zinc-200 font-bold text-[10px] uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all gap-2"
          onClick={() => handleUpdate("SHIPPED")}
          disabled={isLoading !== null || currentStatus === "SHIPPED"}
        >
          {isLoading === "SHIPPED" ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Truck className="h-4 w-4" />}
          Mark as Shipped
        </Button>
        <Button 
          variant="outline" 
          className="h-14 rounded-2xl border-zinc-200 font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 transition-all gap-2"
          onClick={() => handleUpdate("DELIVERED")}
          disabled={isLoading !== null || currentStatus === "PENDING" || currentStatus === "PROCESSING"}
        >
          {isLoading === "DELIVERED" ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          Confirm Delivery
        </Button>
      </div>
      <Button 
        variant="ghost" 
        className="w-full h-14 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 hover:bg-red-50 transition-all gap-2"
        onClick={() => handleUpdate("CANCELLED")}
        disabled={isLoading !== null}
      >
        {isLoading === "CANCELLED" ? <RefreshCw className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
        Void Transaction
      </Button>
    </div>
  )
}
