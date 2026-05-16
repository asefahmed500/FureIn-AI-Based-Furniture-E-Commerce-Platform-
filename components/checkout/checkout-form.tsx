"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowRight, MapPin, User } from "lucide-react"
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

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  postalCode: z.string().min(5, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
})

interface CheckoutFormProps {
  onNext: (data: z.infer<typeof formSchema>) => void
}

export function CheckoutForm({ onNext }: CheckoutFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        {/* Contact Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-wider">Contact Info</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold uppercase tracking-widest text-[10px]">First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} className="h-12 rounded-xl border-border/50 bg-background" />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} className="h-12 rounded-xl border-border/50 bg-background" />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" type="email" {...field} className="h-12 rounded-xl border-border/50 bg-background" />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 000-0000" {...field} className="h-12 rounded-xl border-border/50 bg-background" />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* Shipping Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-wider">Shipping Address</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Architectural Way" {...field} className="h-12 rounded-xl border-border/50 bg-background" />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apartment"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Apartment, suite, etc. (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Suite 405" {...field} className="h-12 rounded-xl border-border/50 bg-background" />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold uppercase tracking-widest text-[10px]">City</FormLabel>
                  <FormControl>
                    <Input placeholder="New York" {...field} className="h-12 rounded-xl border-border/50 bg-background" />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold uppercase tracking-widest text-[10px]">State / Province</FormLabel>
                  <FormControl>
                    <Input placeholder="NY" {...field} className="h-12 rounded-xl border-border/50 bg-background" />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="10001" {...field} className="h-12 rounded-xl border-border/50 bg-background" />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Country</FormLabel>
                  <FormControl>
                    <Input placeholder="United States" {...field} className="h-12 rounded-xl border-border/50 bg-background" />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />
          </div>
        </section>

        <Button type="submit" size="lg" className="w-full h-14 rounded-xl font-bold text-lg">
          Continue to Payment
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </Form>
  )
}
