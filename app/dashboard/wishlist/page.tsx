import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getWishlist } from "@/lib/actions/user"
import { WishlistItems } from "@/components/dashboard/wishlist-items"

export default async function WishlistPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/auth/login")
  }

  const wishlist = await getWishlist()

  // Transform Prisma data to match component expectation if needed
  // Based on getWishlist implementation, it returns product objects
  const items = wishlist.map((product: any) => ({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    images: product.images,
    category: {
      name: product.category?.name || "Uncategorized"
    }
  }))

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <WishlistItems initialItems={items} />
    </div>
  )
}
