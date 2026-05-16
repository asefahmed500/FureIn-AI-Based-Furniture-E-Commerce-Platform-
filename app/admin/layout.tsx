import * as React from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminNavbar } from "@/components/admin/admin-navbar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-950 font-sans selection:bg-zinc-950 selection:text-white">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <AdminSidebar />
        
        <main className="flex-grow p-6 lg:p-12 overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto">
            <AdminNavbar user={session.user} />
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

