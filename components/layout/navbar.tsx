"use client"

import * as React from "react"
import Link from "next/link"
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Armchair,
  Lamp,
  BedDouble,
  Sofa,
  Table,
  DoorOpen,
  TreePine,
  Palette,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/lib/store"
import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, LayoutDashboard, History } from "lucide-react"

// ── Category data ──────────────────────────────────────────────
const categories = [
  {
    title: "Sofas",
    href: "/shop/sofas",
    description: "Luxurious sofas & sectionals for every living space",
    icon: Sofa,
    subcategories: ["Sectional Sofas", "Loveseats", "Sleeper Sofas", "Chaise Lounges"],
  },
  {
    title: "Tables",
    href: "/shop/tables",
    description: "Dining, coffee & side tables crafted to perfection",
    icon: Table,
    subcategories: ["Dining Tables", "Coffee Tables", "Side Tables", "Console Tables"],
  },
  {
    title: "Chairs",
    href: "/shop/chairs",
    description: "Accent chairs, dining chairs & ergonomic seating",
    icon: Armchair,
    subcategories: ["Accent Chairs", "Dining Chairs", "Office Chairs", "Rocking Chairs"],
  },
  {
    title: "Beds",
    href: "/shop/beds",
    description: "Beds & bed frames for restful, beautiful bedrooms",
    icon: BedDouble,
    subcategories: ["Platform Beds", "Upholstered Beds", "Bunk Beds", "Daybeds"],
  },
  {
    title: "Storage",
    href: "/shop/storage",
    description: "Shelving, dressers & smart storage solutions",
    icon: DoorOpen,
    subcategories: ["Bookshelves", "Dressers", "TV Stands", "Cabinets"],
  },
  {
    title: "Lighting",
    href: "/shop/lighting",
    description: "Pendant, floor & table lamps to set the mood",
    icon: Lamp,
    subcategories: ["Floor Lamps", "Table Lamps", "Pendant Lights", "Wall Sconces"],
  },
  {
    title: "Décor",
    href: "/shop/decor",
    description: "Curated accents to complete your interior",
    icon: Palette,
    subcategories: ["Vases", "Wall Art", "Mirrors", "Candles & Holders"],
  },
  {
    title: "Outdoor",
    href: "/shop/outdoor",
    description: "Weather-resistant furniture for patios & gardens",
    icon: TreePine,
    subcategories: ["Patio Sets", "Outdoor Sofas", "Garden Chairs", "Outdoor Dining"],
  },
]

// ── Nav links ──────────────────────────────────────────────────
const navLinks = [
  { title: "New Arrivals", href: "/shop?sort=newest" },
  { title: "Best Sellers", href: "/shop?sort=popular" },
  { title: "Sale", href: "/shop?sale=true", highlight: true },
]

// ── Navbar Component ───────────────────────────────────────────
export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  
  const itemCount = useCartStore((state) => state.getItemCount())
  const { data: session, status } = useSession()
  const user = session?.user
  const [mounted, setMounted] = React.useState(false)

  // Handle hydration mismatch for local storage state
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Track scroll for sticky navbar
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Focus search input when opened
  React.useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  // Close search on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isSearchOpen])

  return (
    <>
      {/* ── Announcement Bar ──────────────────────────────── */}
      <div className="relative z-50 overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto flex items-center justify-center px-4 py-2 text-center text-xs font-medium tracking-wide sm:text-sm">
          <span className="animate-pulse-gentle">✦</span>
          <span className="mx-2">
            Free delivery on orders over $800 • 30-day easy returns
          </span>
          <span className="animate-pulse-gentle">✦</span>
        </div>
      </div>

      {/* ── Main Navbar ───────────────────────────────────── */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-all duration-300",
          isScrolled
            ? "navbar-scrolled border-border/60 bg-background/80 py-2 shadow-md"
            : "border-transparent bg-background py-3"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* ── Left: Logo + Nav ──────────────────────────── */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary transition-transform duration-200 group-hover:scale-105">
                <span className="text-lg font-bold text-primary-foreground">F</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground">
                  FureIn
                </span>
                <span className="hidden text-[10px] tracking-widest text-muted-foreground uppercase sm:block">
                  Crafting Comfort
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Categories Mega Menu */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-9 bg-transparent px-3 text-sm font-medium text-foreground hover:bg-secondary hover:text-foreground data-[state=open]:bg-secondary">
                      <span className="flex items-center gap-1.5">
                        Categories
                        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[680px] gap-0 p-4 lg:w-[780px] lg:grid-cols-4">
                        {categories.map((category) => (
                          <NavigationMenuLink key={category.title} asChild>
                            <Link
                              href={category.href}
                              className="group flex flex-col gap-2 rounded-xl p-3 transition-colors hover:bg-secondary"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                                  <category.icon className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-sm font-semibold text-foreground">
                                  {category.title}
                                </span>
                              </div>
                              <p className="text-xs leading-snug text-muted-foreground line-clamp-2">
                                {category.description}
                              </p>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {category.subcategories.slice(0, 2).map((sub) => (
                                  <span
                                    key={sub}
                                    className="rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                                  >
                                    {sub}
                                  </span>
                                ))}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Other nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={cn(
                    "inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground",
                    link.highlight
                      ? "text-amber font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  {link.title}
                  {link.highlight && (
                    <span className="ml-1.5 inline-flex h-4 items-center rounded-full bg-amber/15 px-1.5 text-[10px] font-bold text-amber">
                      HOT
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Right: Search + Icons ────────────────────── */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Desktop Search Bar */}
            <div className="relative hidden md:block">
              <div
                className={cn(
                  "flex items-center overflow-hidden rounded-xl border bg-secondary/50 transition-all duration-300",
                  isSearchOpen ? "w-72 border-primary/30" : "w-48 border-transparent"
                )}
              >
                <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  onBlur={() => {
                    if (!searchQuery) setIsSearchOpen(false)
                  }}
                  placeholder="Search furniture..."
                  className="h-9 w-full bg-transparent px-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      searchInputRef.current?.focus()
                    }}
                    className="mr-2 rounded-full p-0.5 hover:bg-muted"
                  >
                    <X className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-[18px] w-[18px]" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Wishlist */}
            <Link href="/dashboard/wishlist">
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Heart className="h-[18px] w-[18px]" />
                <Badge className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber p-0 text-[10px] font-bold text-white">
                  0
                </Badge>
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <ShoppingBag className="h-[18px] w-[18px]" />
                {mounted && itemCount > 0 && (
                  <Badge className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary p-0 text-[10px] font-bold text-primary-foreground">
                    {itemCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </Link>

            {/* User / Profile */}
            <div className="flex items-center">
              {mounted && user && user.role === "ADMIN" && (
                <Link href="/admin">
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary">
                    <Settings className="h-[18px] w-[18px]" />
                    <span className="sr-only">Admin Portal</span>
                  </Button>
                </Link>
              )}
              {mounted && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-black text-primary border border-primary/20">
                        {user.name?.[0] || user.email?.[0]}
                      </div>
                      <span className="sr-only">Account menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/orders" className="cursor-pointer">
                        <History className="mr-2 h-4 w-4" />
                        <span>Orders</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer text-destructive focus:text-destructive"
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <User className="h-[18px] w-[18px]" />
                    <span className="sr-only">Sign In</span>
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] overflow-y-auto bg-background p-0">
                <SheetHeader className="border-b px-6 py-5">
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                      <span className="text-sm font-bold text-primary-foreground">F</span>
                    </div>
                    <span className="font-bold">FureIn</span>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Search */}
                <div className="border-b px-4 py-4">
                  <div className="flex items-center rounded-xl border bg-secondary/50 px-3">
                    <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search furniture..."
                      className="h-10 w-full bg-transparent px-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Mobile Nav Links */}
                <div className="px-2 py-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary",
                        link.highlight ? "text-amber" : "text-foreground"
                      )}
                    >
                      {link.title}
                      {link.highlight && (
                        <span className="ml-2 rounded-full bg-amber/15 px-2 py-0.5 text-[10px] font-bold text-amber">
                          HOT
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                {/* Mobile Categories */}
                <div className="border-t px-2 py-3">
                  <p className="px-4 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Categories
                  </p>
                  {categories.map((category) => (
                    <Link
                      key={category.title}
                      href={category.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <category.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <span className="block">{category.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {category.subcategories.length} subcategories
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Mobile Account Links */}
                <div className="border-t px-2 py-3">
                  <p className="px-4 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Account
                  </p>
                  <Link
                    href={user ? "/dashboard" : "/login"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <User className="h-4 w-4" />
                    {user ? "View Dashboard" : "Sign In / Register"}
                  </Link>
                  <Link
                    href="/dashboard/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Shopping Bag
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* ── Mobile Expanded Search ──────────────────────── */}
        {isSearchOpen && (
          <div className="border-t px-4 py-3 md:hidden animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="flex flex-1 items-center rounded-xl border bg-secondary/50 px-3">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search furniture, materials, styles..."
                  autoFocus
                  className="h-10 w-full bg-transparent px-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsSearchOpen(false)
                  setSearchQuery("")
                }}
                className="shrink-0 text-sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
