import { getCart } from "@/lib/actions/cart"
import { CheckoutClientContent } from "@/components/checkout/checkout-client-content"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/login?callbackUrl=/checkout")
  }

  const dbCartItems = await getCart()
  
  // If cart is empty, redirect back to shop or cart
  if (dbCartItems.length === 0) {
    // We might want to allow checking out local items if not logged in, 
    // but the session check above already forces login.
    // So if DB cart is empty, they have nothing to checkout.
    redirect("/shop")
  }

  return (
    <main className="min-h-screen bg-secondary/5">
      <CheckoutClientContent initialCartItems={dbCartItems} />
    </main>
  )
}
