import { getCart } from "@/lib/actions/cart"
import { CartClientContent } from "@/components/cart/cart-client-content"

export default async function CartPage() {
  const dbCartItems = await getCart()
  
  return (
    <main className="min-h-screen bg-background">
      <CartClientContent initialDbItems={dbCartItems} />
    </main>
  )
}
