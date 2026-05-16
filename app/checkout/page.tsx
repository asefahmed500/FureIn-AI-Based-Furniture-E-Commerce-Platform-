import { getCart } from "@/lib/actions/cart"
import { CheckoutClientContent } from "@/components/checkout/checkout-client-content"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions)
  const dbCartItems = session ? await getCart() : []

  return (
    <main className="min-h-screen bg-secondary/5">
      <CheckoutClientContent initialCartItems={dbCartItems} />
    </main>
  )
}
