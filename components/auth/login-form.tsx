"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, Lock, Mail, Globe, Command } from "lucide-react"
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
import { signIn } from "next-auth/react"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid email or password.")
        setIsLoading(false)
        return
      }

      toast.success("Welcome back to FureIn")
      
      // Get session to check role for enterprise-level redirect
      const res = await fetch("/api/auth/session")
      const session = await res.json()
      
      if (session?.user?.role === "ADMIN") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
      
      router.refresh()
    } catch {
      toast.error("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Log In</h1>
        <p className="text-muted-foreground font-medium text-sm">Access your FureIn account.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          <div className="flex items-center justify-end">
            <Link href="/forgot-password" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" size="lg" disabled={isLoading} className="w-full h-14 rounded-xl font-bold text-lg">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Logging In...
              </div>
            ) : (
              "Log In"
            )}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-wider">
          <span className="bg-background px-4 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-12 rounded-xl font-bold border-2">
          <Command className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" className="h-12 rounded-xl font-bold border-2">
          <Globe className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>


      <p className="text-center text-xs font-bold text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary hover:underline underline-offset-4">
          Create Account
        </Link>
      </p>
    </div>
  )
}
