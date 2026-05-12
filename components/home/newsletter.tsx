"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Mail, Sparkles } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast.error("Invalid Email Address", {
        description: "Please enter a valid email to join our private circle.",
      })
      return
    }

    setIsSubmitting(true)
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Welcome to the FureIn Inner Circle", {
        description: "Check your inbox for your complimentary 10% welcome voucher and upcoming private catalog releases.",
      })
      setEmail("")
    }, 800)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber/10 via-secondary to-background p-8 sm:p-12 lg:p-16 border border-amber/20 shadow-sm text-center">
        {/* Absolute decorative ambient lighting */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-48 w-48 rounded-full bg-amber/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-xs font-extrabold text-amber border border-amber/30 shadow-2xs mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Join the Exclusive List
          </span>

          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Inspiration & Priority Access
          </h2>

          <p className="mt-3 text-sm text-muted-foreground sm:text-base max-w-xl">
            Subscribe to receive curated monthly architecture features, private flash sale invitations, and insights from our handcrafted furniture atelier. Unsubscribe at any time.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-11 rounded-full bg-background border-border/80 text-sm focus-visible:ring-amber shadow-xs"
                aria-label="Email address for newsletter"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 rounded-full px-6 font-bold shadow-md shrink-0"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
            </Button>
          </form>

          <span className="mt-4 text-[11px] text-muted-foreground">
            We respect your privacy. No spam, guaranteed.
          </span>
        </div>
      </div>
    </section>
  )
}
