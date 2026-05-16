"use client"

import * as React from "react"
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
import { ShieldAlert, KeyRound } from "lucide-react"
import { updatePassword } from "@/lib/actions/user"

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export function PasswordForm() {
  const [isPending, setIsPending] = React.useState(false)

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof passwordSchema>) {
    setIsPending(true)
    try {
      const result = await updatePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
      if (result.success) {
        toast.success("Security protocols updated")
        form.reset()
      } else {
        toast.error(result.error || "Failed to update password")
      }
    } catch {
      toast.error("An error occurred")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="space-y-6">
          <div className="flex items-center gap-4 border-b border-border/50 pb-4">
            <KeyRound className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-black uppercase tracking-widest">Security Credentials</h3>
          </div>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Access Key</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="h-12 rounded-xl bg-secondary/20 border-border/50 font-medium" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">New Cipher Key</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} className="h-12 rounded-xl bg-secondary/20 border-border/50 font-medium" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Confirm Cipher Key</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} className="h-12 rounded-xl bg-secondary/20 border-border/50 font-medium" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </section>

        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 flex gap-4">
          <ShieldAlert className="h-6 w-6 text-amber-600 shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-black text-amber-900 uppercase tracking-tight">System Notice</p>
            <p className="text-xs font-medium text-amber-800 leading-relaxed">
              Updating your cipher key will require re-authentication on all other architectural terminals.
            </p>
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <Button 
            type="submit" 
            disabled={isPending}
            className="h-12 rounded-xl font-black px-8 uppercase tracking-widest text-xs shadow-lg shadow-primary/20"
          >
            {isPending ? "Encrypting..." : "Update Credentials"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
