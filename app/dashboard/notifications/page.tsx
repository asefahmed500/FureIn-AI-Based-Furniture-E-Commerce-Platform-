import { Bell } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotificationsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h1 className="text-4xl font-black tracking-tight">Notifications</h1>
        <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
          Stay updated on orders, promotions, and account activity.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-32 space-y-8 text-center border-2 border-dashed border-border/50 rounded-3xl">
        <div className="h-24 w-24 rounded-full bg-secondary/5 flex items-center justify-center">
          <Bell className="h-12 w-12 text-muted-foreground/20" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black uppercase tracking-widest">All Clear</h2>
          <p className="text-muted-foreground font-medium max-w-[400px]">
            You have no new notifications. We&apos;ll alert you when something comes up.
          </p>
        </div>
        <Button asChild className="h-12 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20">
          <Link href="/shop">Browse Shop</Link>
        </Button>
      </div>
    </div>
  )
}
