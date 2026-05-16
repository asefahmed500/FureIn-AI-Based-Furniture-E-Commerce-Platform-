import Link from "next/link"
import { 
  Users, 
  Search, 
  MoreHorizontal, 
  UserPlus, 
  Mail, 
  ShieldCheck, 
  Trash2,
  Calendar,
  ShoppingBag,
  Heart
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
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUsers, getUserStats, updateUserRole } from "@/lib/actions/user"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Role } from "@/generated/prisma/client"

export default async function AdminUsersPage({
  searchParams
}: {
  searchParams: Promise<{ query?: string; page?: string }>
}) {
  const { query, page } = await searchParams
  const currentPage = Number(page) || 1

  const [{ users, total, pages }, stats] = await Promise.all([
    getUsers({ query, page: currentPage }),
    getUserStats()
  ])

  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold tracking-tight">User Directory</h2>
          <p className="text-zinc-500 font-medium text-xs uppercase tracking-[0.2em]">Manage enterprise accounts, roles, and security permissions</p>
        </div>
        <Button className="h-12 px-6 rounded-2xl bg-zinc-950 text-white hover:bg-zinc-800 transition-all gap-2">
          <UserPlus className="h-4 w-4" />
          Invite Colleague
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white p-8 group hover:scale-[1.02] transition-all duration-500">
          <div className="flex items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-950 group-hover:bg-zinc-950 group-hover:text-white transition-all duration-500 shadow-sm">
              <Users className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Total Members</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
          </div>
        </Card>
        <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white p-8 group hover:scale-[1.02] transition-all duration-500">
          <div className="flex items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-sm">
              <UserPlus className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">New This Month</p>
              <p className="text-3xl font-bold">{stats.newThisMonth}</p>
            </div>
          </div>
        </Card>
        <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white p-8 group hover:scale-[1.02] transition-all duration-500">
          <div className="flex items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Administrative</p>
              <p className="text-3xl font-bold">{stats.admins}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white overflow-hidden">
        <div className="p-8 border-b border-zinc-50 bg-zinc-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <form action="/admin/users" className="relative group w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-950 transition-colors" />
            <Input 
              name="query"
              defaultValue={query}
              placeholder="Search by name or email..." 
              className="pl-11 h-12 rounded-xl border-zinc-200 bg-white focus:shadow-lg transition-all"
            />
          </form>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="h-12 px-6 rounded-xl border-zinc-200 bg-white text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-zinc-50 transition-all">
              Filter Roles
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-zinc-50/50">
            <TableRow className="border-zinc-100 hover:bg-transparent">
              <TableHead className="text-[11px] font-bold uppercase tracking-widest px-8 h-20">Identity</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-widest h-20">Access Role</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-widest h-20">Activity</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-widest h-20">Join Date</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-widest h-20 text-right px-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-zinc-50 hover:bg-zinc-50/50 transition-colors group">
                <TableCell className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-md group-hover:scale-105 transition-transform">
                      <AvatarImage src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                      <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-zinc-950">{user.name || "N/A"}</p>
                      <p className="text-[10px] font-medium text-zinc-400 lowercase">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge variant="secondary" className={cn(
                      "text-[9px] font-bold uppercase tracking-widest h-6 px-3 rounded-lg border-0 shadow-sm w-fit",
                      user.role === "ADMIN" ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-600"
                    )}>
                      {user.role}
                    </Badge>
                    {user.isSuspended && (
                      <Badge variant="destructive" className="text-[8px] font-bold uppercase tracking-widest h-5 px-2 rounded-md w-fit">
                        Suspended
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 group/stat">
                      <ShoppingBag className="h-3.5 w-3.5 text-zinc-400 group-hover/stat:text-zinc-950 transition-colors" />
                      <span className="text-[10px] font-bold">{user._count.orders}</span>
                    </div>
                    <div className="flex items-center gap-2 group/stat">
                      <Heart className="h-3.5 w-3.5 text-zinc-400 group-hover/stat:text-zinc-950 transition-colors" />
                      <span className="text-[10px] font-bold">{user._count.wishlistItems}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {format(new Date(user.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right px-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-md transition-all">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-2xl border-0 shadow-2xl p-2">
                      <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 py-2">Account Control</DropdownMenuLabel>
                      <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-bold gap-3 focus:bg-zinc-50 cursor-pointer">
                        <Mail className="h-3.5 w-3.5 text-zinc-400" />
                        Contact
                      </DropdownMenuItem>
                      <form action={async () => {
                        "use server"
                        const newRole = user.role === "ADMIN" ? "USER" : "ADMIN"
                        await updateUserRole(user.id, newRole as Role)
                      }}>
                        <button className="w-full">
                          <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-bold gap-3 focus:bg-zinc-50 cursor-pointer">
                            <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
                            {user.role === "ADMIN" ? "Revoke Admin" : "Grant Admin"}
                          </DropdownMenuItem>
                        </button>
                      </form>
                      <DropdownMenuSeparator className="bg-zinc-50" />
                      <form action={async () => {
                        "use server"
                        const { deleteUser } = await import("@/lib/actions/user")
                        await deleteUser(user.id)
                      }}>
                        <button className="w-full">
                          <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-bold gap-3 focus:bg-red-50 text-red-600 focus:text-red-600 cursor-pointer">
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete User
                          </DropdownMenuItem>
                        </button>
                      </form>
                      <DropdownMenuSeparator className="bg-zinc-50" />
                      <form action={async () => {
                        "use server"
                        const { toggleUserSuspension } = await import("@/lib/actions/user")
                        await toggleUserSuspension(user.id)
                      }}>
                        <button className="w-full">
                          <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-bold gap-3 focus:bg-red-50 text-red-600 focus:text-red-600 cursor-pointer">
                            {user.isSuspended ? "Unsuspend Account" : "Suspend Account"}
                          </DropdownMenuItem>
                        </button>
                      </form>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-8 border-t border-zinc-50 bg-zinc-50/30 flex items-center justify-between">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Global user directory | {total} total records</p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 rounded-xl border-zinc-200 text-[10px] font-bold uppercase tracking-widest disabled:opacity-30" 
              asChild
              disabled={currentPage <= 1}
            >
              <Link href={`/admin/users?page=${currentPage - 1}${query ? `&query=${query}` : ""}`}>Previous</Link>
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
                  <Link href={`/admin/users?page=${p}${query ? `&query=${query}` : ""}`}>{p}</Link>
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
              <Link href={`/admin/users?page=${currentPage + 1}${query ? `&query=${query}` : ""}`}>Next Page</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
