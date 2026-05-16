"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { User, Mail } from "lucide-react"
import { updateProfile } from "@/lib/actions/user"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
})

interface ProfileFormProps {
  user: {
    name: string
    email: string
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const [isPending, setIsPending] = React.useState(false)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsPending(true)
    try {
      const result = await updateProfile(values)
      if (result.success) {
        toast.success("Profile updated successfully")
        router.refresh()
      } else {
        toast.error(result.error || "Something went wrong")
      }
    } catch {
      toast.error("Failed to update profile")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="space-y-6">
          <h3 className="text-xl font-black uppercase tracking-widest border-b border-border/50 pb-4">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Display Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                      <Input {...field} className="h-12 pl-12 rounded-xl bg-secondary/20 border-border/50 font-medium" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Architectural Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                      <Input {...field} className="h-12 pl-12 rounded-xl bg-secondary/20 border-border/50 font-medium" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black uppercase tracking-widest border-b border-border/50 pb-4">Communication Protocols</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/5 border border-border/50">
              <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-widest">Order Dossiers</p>
                <p className="text-xs font-medium text-muted-foreground">Receive detailed reports on order status and transit.</p>
              </div>
              <div className="h-6 w-12 rounded-full bg-primary relative cursor-pointer">
                <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/5 border border-border/50">
              <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-widest">Architectural Insights</p>
                <p className="text-xs font-medium text-muted-foreground">Get exclusive access to new collection arrivals and trend reports.</p>
              </div>
              <div className="h-6 w-12 rounded-full bg-zinc-200 relative cursor-pointer">
                <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
              </div>
            </div>
          </div>
        </section>

        <div className="pt-6 flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => form.reset()}
            className="h-12 rounded-xl font-black px-8 border-2 uppercase tracking-widest text-xs"
          >
            Discard Changes
          </Button>
          <Button 
            type="submit" 
            disabled={isPending}
            className="h-12 rounded-xl font-black px-8 uppercase tracking-widest text-xs shadow-lg shadow-primary/20"
          >
            {isPending ? "Syncing..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
