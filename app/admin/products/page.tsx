import Link from "next/link"
import { 
  Search, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye,
  Package,
  Download
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
import { getProducts, getCategories, deleteProduct, archiveProduct } from "@/lib/actions/product"
import { ProductDialog } from "@/components/admin/ProductDialog"
import { cn } from "@/lib/utils"

export default async function AdminProductsPage({
  searchParams
}: {
  searchParams: Promise<{ query?: string; page?: string; category?: string }>
}) {
  const { query, page, category } = await searchParams
  const currentPage = Number(page) || 1

  const [{ products, pages }, categories] = await Promise.all([
    getProducts({ query, page: currentPage, category, includeArchived: true }),
    getCategories()
  ])

  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold tracking-tight">Inventory Management</h2>
          <p className="text-zinc-500 font-medium text-xs uppercase tracking-[0.2em]">Manage your premium furniture collection and stock levels</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="h-12 px-6 rounded-2xl border-zinc-200 bg-white shadow-sm font-bold text-[10px] uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <ProductDialog categories={categories} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-1 border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white p-8">
          <div className="space-y-8">
            <form action="/admin/products" className="space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Search Products</h3>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-950 transition-colors" />
                <Input 
                  name="query"
                  defaultValue={query}
                  placeholder="Filter by name..." 
                  className="pl-11 h-12 rounded-xl border-zinc-200 bg-zinc-50/50 focus:bg-white transition-all"
                />
              </div>
            </form>

            <div className="space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Categories</h3>
              <div className="space-y-2">
                <Link 
                  href="/admin/products"
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all group",
                    !category ? "bg-zinc-950 text-white" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                  )}
                >
                  <span>All Collections</span>
                </Link>
                {categories.map((cat) => (
                  <Link 
                    key={cat.id}
                    href={`/admin/products?category=${cat.slug}${query ? `&query=${query}` : ""}`}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all group",
                      category === cat.slug ? "bg-zinc-950 text-white" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                    )}
                  >
                    <span>{cat.name}</span>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-lg transition-all",
                      category === cat.slug ? "bg-white/20" : "bg-zinc-100 group-hover:bg-zinc-950 group-hover:text-white"
                    )}>{cat._count.products}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-50">
              <div className="p-6 rounded-3xl bg-zinc-950 text-white space-y-4 shadow-xl shadow-zinc-950/20">
                <Package className="h-8 w-8 opacity-50" />
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Total Inventory</p>
                  <p className="text-3xl font-bold">{products.reduce((acc, p) => acc + p.stock, 0)} Units</p>
                </div>
                <p className="text-[9px] font-medium opacity-40 leading-relaxed uppercase tracking-widest">Global fulfillment capacity across all active SKUs</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-3 border-0 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-50/50">
              <TableRow className="border-zinc-100 hover:bg-transparent">
                <TableHead className="text-[11px] font-bold uppercase tracking-widest px-8 h-20">Product Details</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-widest h-20">Status</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-widest h-20">Price</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-widest h-20">Stock</TableHead>
                <TableHead className="text-[11px] font-bold uppercase tracking-widest h-20 text-right px-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="border-zinc-50 hover:bg-zinc-50/50 transition-colors group">
                  <TableCell className="px-8 py-6">
                    <div className="flex items-center gap-6">
                      <div className="h-20 w-20 rounded-2xl bg-zinc-100 overflow-hidden shadow-inner flex-shrink-0">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-zinc-300">
                            <Package className="h-8 w-8" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-1.5 min-w-0">
                        <p className="text-sm font-bold truncate pr-4">{product.name}</p>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{product.category?.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5">
                      {product.isArchived && (
                        <Badge className="bg-red-100 text-red-600 text-[9px] font-bold uppercase tracking-widest h-5 px-2 rounded-lg border-0 shadow-sm">Archived</Badge>
                      )}
                      {product.isFeatured && (
                        <Badge className="bg-zinc-950 text-white text-[9px] font-bold uppercase tracking-widest h-5 px-2 rounded-lg border-0 shadow-sm">Featured</Badge>
                      )}
                      {product.isSale && (
                        <Badge className="bg-amber-500 text-white text-[9px] font-bold uppercase tracking-widest h-5 px-2 rounded-lg border-0 shadow-sm">Sale</Badge>
                      )}
                      {product.isNew && (
                        <Badge className="bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-widest h-5 px-2 rounded-lg border-0 shadow-sm">New</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-zinc-950">${Number(product.price).toLocaleString()}</p>
                      {product.originalPrice && (
                        <p className="text-[10px] font-bold text-zinc-400 line-through">${Number(product.originalPrice).toLocaleString()}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-2 w-2 rounded-full shadow-sm",
                        product.stock > 10 ? "bg-emerald-500 shadow-emerald-200" : product.stock > 0 ? "bg-amber-500 shadow-amber-200" : "bg-red-500 shadow-red-200"
                      )} />
                      <span className="text-xs font-bold">{product.stock} units</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-md transition-all">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-2xl border-0 shadow-2xl p-2">
                        <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 py-2">Product Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-bold gap-3 focus:bg-zinc-50 cursor-pointer">
                          <Eye className="h-3.5 w-3.5" />
                          View Listing
                        </DropdownMenuItem>
                        <ProductDialog product={product} categories={categories}>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="rounded-xl px-3 py-2 text-xs font-bold gap-3 focus:bg-zinc-50 cursor-pointer">
                            <Pencil className="h-3.5 w-3.5" />
                            Edit Details
                          </DropdownMenuItem>
                        </ProductDialog>
                        <DropdownMenuSeparator className="bg-zinc-50" />
                        <form action={async () => { "use server"; await (product.isArchived ? deleteProduct(product.id) : archiveProduct(product.id)) }}>
                          <button className="w-full text-left">
                            <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-bold gap-3 focus:bg-red-50 text-red-600 focus:text-red-600 cursor-pointer">
                              <Trash2 className="h-3.5 w-3.5" />
                              {product.isArchived ? "Delete Product" : "Archive Product"}
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
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Showing {products.length} active stock keeping units</p>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-10 rounded-xl border-zinc-200 text-[10px] font-bold uppercase tracking-widest disabled:opacity-30" 
                asChild
                disabled={currentPage <= 1}
              >
                <Link href={`/admin/products?page=${currentPage - 1}${query ? `&query=${query}` : ""}${category ? `&category=${category}` : ""}`}>Previous</Link>
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
                    <Link href={`/admin/products?page=${p}${query ? `&query=${query}` : ""}${category ? `&category=${category}` : ""}`}>{p}</Link>
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
                <Link href={`/admin/products?page=${currentPage + 1}${query ? `&query=${query}` : ""}${category ? `&category=${category}` : ""}`}>Next Page</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
