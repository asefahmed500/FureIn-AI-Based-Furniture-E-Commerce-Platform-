"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus, Loader2, X } from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { createProduct, updateProduct } from "@/lib/actions/product"
import { toast } from "sonner"
import { ProductWithRelations, CategoryWithCount } from "@/types"

const ProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.preprocess((val) => Number(val), z.number().positive("Price must be positive")),
  originalPrice: z.preprocess((val) => val === "" ? null : Number(val), z.number().positive().optional().nullable()),
  stock: z.preprocess((val) => Number(val), z.number().int().min(0, "Stock cannot be negative")),
  categoryId: z.string().min(1, "Category is required"),
  material: z.string().optional().nullable(),
  isFeatured: z.boolean().optional().default(false),
  isNew: z.boolean().optional().default(false),
  isSale: z.boolean().optional().default(false),
  images: z.array(z.string()).optional().default([]),
})

interface ProductDialogProps {
  product?: ProductWithRelations // For editing
  categories: CategoryWithCount[]
  children?: React.ReactNode
}

export function ProductDialog({ product, categories, children }: ProductDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [isPending, setIsPending] = React.useState(false)
  const [images, setImages] = React.useState<string[]>(product?.images || [])

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema) as any,
    defaultValues: product ? {
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: Number(product.price),
      originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
      stock: product.stock,
      categoryId: product.categoryId,
      material: product.material || "",
      isFeatured: product.isFeatured,
      isNew: product.isNew,
      isSale: product.isSale,
      images: product.images,
    } : {
      name: "",
      slug: "",
      description: "",
      price: 0,
      originalPrice: null,
      stock: 0,
      categoryId: "",
      material: "",
      isFeatured: false,
      isNew: true,
      isSale: false,
      images: [],
    },
  })


  async function onSubmit(values: z.infer<typeof ProductSchema>) {
    setIsPending(true)
    try {
      const data = { ...values, images }
      if (product) {
        const res = await updateProduct(product.id, data)
        if (res.success) {
          toast.success("Product updated successfully")
          setOpen(false)
        } else {
          toast.error(res.error as string || "Failed to update product")
        }
      } else {
        const res = await createProduct(data)
        if (res.success) {
          toast.success("Product created successfully")
          setOpen(false)
          form.reset()
          setImages([])
        } else {
          toast.error(res.error as string || "Failed to create product")
        }
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsPending(false)
    }
  }

  const addImage = () => {
    const url = window.prompt("Enter image URL")
    if (url) setImages([...images, url])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="h-12 px-6 rounded-2xl bg-zinc-950 text-white hover:bg-zinc-800 transition-all gap-2">
            <Plus className="h-4 w-4" />
            Add New Product
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-0 shadow-2xl p-0">
        <div className="p-8 space-y-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              {product ? "Edit Product" : "Create New Product"}
            </DialogTitle>
            <DialogDescription className="text-zinc-500 font-medium text-xs uppercase tracking-widest">
              Fill in the details to {product ? "update" : "list"} an enterprise furniture item
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control as any}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. Velvet Armchair" {...field} className="h-12 rounded-xl border-zinc-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="velvet-armchair" {...field} className="h-12 rounded-xl border-zinc-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control as any}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Detailed product description..." 
                        className="min-h-[120px] rounded-xl border-zinc-200 resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FormField
                  control={form.control as any}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} className="h-12 rounded-xl border-zinc-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="originalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Original Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} value={field.value || ""} className="h-12 rounded-xl border-zinc-200" />
                      </FormControl>
                      <FormDescription className="text-[9px]">Optional: Shows as discount</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Inventory</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} className="h-12 rounded-xl border-zinc-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control as any}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-xl border-zinc-200">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl">
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="material"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Material</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. Solid Oak, Velvet" {...field} className="h-12 rounded-xl border-zinc-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Product Images</FormLabel>
                <div className="grid grid-cols-4 gap-4">
                  {images.map((url, i) => (
                    <div key={i} className="relative group aspect-square rounded-xl bg-zinc-50 overflow-hidden border border-zinc-100 shadow-sm">
                      <img src={url} alt="" className="h-full w-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={addImage}
                    className="aspect-square rounded-xl bg-zinc-50 border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-zinc-400 hover:border-zinc-950 hover:text-zinc-950 transition-all gap-2"
                  >
                    <Plus className="h-6 w-6" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Add URL</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 border-y border-zinc-50">
                <FormField
                  control={form.control as any}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-xl border border-zinc-100 p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest">Featured</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="isNew"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-xl border border-zinc-100 p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest">New Arrival</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="isSale"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-xl border border-zinc-100 p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest">On Sale</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="pt-8">
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="h-14 px-12 rounded-2xl bg-zinc-950 text-white hover:bg-zinc-800 transition-all font-bold text-xs uppercase tracking-widest"
                >
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {product ? "Save Changes" : "Publish Product"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
