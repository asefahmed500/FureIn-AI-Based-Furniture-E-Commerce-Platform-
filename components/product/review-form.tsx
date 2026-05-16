"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/ui/star-rating"
import { createReview } from "@/lib/actions/product"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"

const reviewSchema = z.object({
  author: z.string().min(2, "Name must be at least 2 characters"),
  rating: z.number().min(1, "Please select a rating").max(5),
  title: z.string().min(3, "Title must be at least 3 characters"),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
})

type ReviewFormValues = z.infer<typeof reviewSchema>

interface ReviewFormProps {
  productId: string
  trigger?: React.ReactNode
}

export function ReviewForm({ productId, trigger }: ReviewFormProps) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isPending, setIsPending] = React.useState(false)

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      author: session?.user?.name || "",
      rating: 5,
      title: "",
      comment: "",
    },
  })

  // Update author if session becomes available
  React.useEffect(() => {
    if (session?.user?.name && !form.getValues("author")) {
      form.setValue("author", session.user.name)
    }
  }, [session, form])

  async function onSubmit(values: ReviewFormValues) {
    setIsPending(true)
    try {
      const result = await createReview({
        productId,
        ...values,
      })

      if (result.success) {
        toast.success("Review submitted successfully!")
        form.reset()
        setIsOpen(false)
      } else {
        toast.error(result.error || "Failed to submit review")
      }
    } catch {
      toast.error("An unexpected error occurred")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="font-bold border-2 hover:bg-primary hover:text-primary-foreground transition-all">
            Share Your Experience
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl border-2">
        <DialogHeader className="p-8 bg-secondary/30 border-b">
          <DialogTitle className="text-2xl font-black">Share Your Experience</DialogTitle>
          <DialogDescription className="font-medium mt-2">
            Your feedback helps us maintain the highest standards of architectural excellence.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Overall Rating</FormLabel>
                  <FormControl>
                    <StarRating 
                      rating={field.value} 
                      interactive 
                      onRatingChange={field.onChange}
                      size="lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Your Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your name" 
                        className="rounded-xl border-2 h-12 font-medium" 
                        {...field} 
                        disabled={!!session?.user}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Review Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Stunning craftsmanship" className="rounded-xl border-2 h-12 font-medium" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Your Thoughts</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your detailed experience with this piece..." 
                      className="rounded-xl border-2 min-h-[120px] font-medium resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full h-14 rounded-xl text-lg font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Post Review"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
