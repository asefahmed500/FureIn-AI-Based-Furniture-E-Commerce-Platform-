"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  return (
    <Button 
      variant="ghost" 
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full justify-start gap-4 px-4 h-12 rounded-xl text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 transition-all"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  )
}
