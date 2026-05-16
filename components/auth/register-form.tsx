"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, Lock, Mail, User, ShieldCheck } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { signup } from "@/lib/actions/auth"
import { signIn } from "next-auth/react"

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid architectural address"),
  password: z.string().min(8, "Security protocol requires 8+ characters"),
  terms: z.boolean().refine(v => v === true, "Must accept structural protocols"),
})

export function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    
    try {
      const result = await signup({
        name: values.name,
        email: values.email,
        password: values.password
      })

      if (result.error) {
        if (typeof result.error === 'object') {
          Object.entries(result.error).forEach(([, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach(msg => toast.error(msg))
            }
          })
        } else {
          toast.error(result.error)
        }
        setIsLoading(false)
        return
      }

      toast.success("Account created successfully. Logging you in...")
      
      // Automatically sign in after registration
      const loginResult = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (loginResult?.error) {
        toast.error("Account created, but automatic login failed. Please log in manually.")
        router.push("/login")
      } else {
        router.push("/dashboard")
      }
    } catch {
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
        <p className="text-muted-foreground font-medium text-sm">Join the FureIn community.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-xs uppercase tracking-wider">Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                    <Input placeholder="John Doe" {...field} className="h-12 pl-12 rounded-xl bg-secondary/20 border-border/50 font-medium" />
                  </div>
                </FormControl>
                <FormMessage className="text-[10px] font-bold" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-xs uppercase tracking-wider">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                    <Input placeholder="your@email.com" {...field} className="h-12 pl-12 rounded-xl bg-secondary/20 border-border/50 font-medium" />
                  </div>
                </FormControl>
                <FormMessage className="text-[10px] font-bold" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-xs uppercase tracking-wider">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      {...field} 
                      className="h-12 pl-12 pr-12 rounded-xl bg-secondary/20 border-border/50 font-medium" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-[10px] font-bold" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-border/50 p-4 bg-secondary/5">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-[10px] font-bold uppercase tracking-wider leading-relaxed">
                    I agree to the Terms of Service and Privacy Policy.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" disabled={isLoading} className="w-full h-14 rounded-xl font-bold text-lg">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-center text-xs font-bold text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline underline-offset-4">
          Log In
        </Link>
      </p>

      <div className="flex items-center justify-center gap-2 pt-4">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Secure & Private</span>
      </div>
    </div>
  )
}
