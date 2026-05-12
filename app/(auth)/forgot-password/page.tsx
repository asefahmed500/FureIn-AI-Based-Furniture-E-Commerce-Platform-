"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Mail, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react"
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
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string().email("Invalid architectural address"),
})

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit() {
    setIsLoading(true)
    // Simulate email send
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
    toast.success("Recovery protocol initiated")
  }

  if (isSubmitted) {
    return (
      <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-black tracking-tight uppercase tracking-[0.2em]">Protocol Sent</h1>
          <p className="text-muted-foreground font-medium text-sm leading-relaxed max-w-[320px]">
            We&apos;ve dispatched a secure recovery link to <span className="text-foreground font-bold">{form.getValues("email")}</span>. 
            Please check your communication channels.
          </p>
        </div>
        
        <Button asChild variant="outline" className="w-full h-14 rounded-xl font-black text-lg uppercase tracking-widest border-2">
          <Link href="/login">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Entry
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-black tracking-tight uppercase tracking-[0.2em]">Recover Access</h1>
        <p className="text-muted-foreground font-medium text-sm">Initiate the architectural recovery protocol.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-black uppercase tracking-widest text-[10px]">Vault Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                    <Input placeholder="architect@furein.com" {...field} className="h-12 pl-12 rounded-xl bg-secondary/20 border-border/50 font-medium" />
                  </div>
                </FormControl>
                <FormMessage className="text-[10px] font-bold" />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" disabled={isLoading} className="w-full h-14 rounded-xl font-black text-lg uppercase tracking-widest">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              "Send Recovery Link"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <Link href="/login" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
          Remember your key? Authorized Entry
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2 pt-4">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">High-Grade Preservation Enabled</span>
      </div>
    </div>
  )
}
