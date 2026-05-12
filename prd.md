# Product Requirements Document (PRD)
## FureIn – Furniture E-Commerce Platform

| Field | Details |
|---|---|
| **Document Version** | v1.0 |
| **Status** | Draft |
| **Last Updated** | May 2026 |
| **Document Owner** | Product Team |
| **Brand Name** | FureIn (Crafting Comfort, Defining Spaces) |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Overview](#2-product-overview)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [User Personas](#4-user-personas)
5. [Feature Sections & Requirements](#5-feature-sections--requirements)
   - 5.1 Homepage
   - 5.2 Product Listing Page (PLP)
   - 5.3 Product Details Page (PDP)
   - 5.4 Shopping Cart
   - 5.5 Checkout
   - 5.6 Authentication
   - 5.7 User Dashboard
   - 5.8 Admin Dashboard
   - 5.9 Mobile UI/UX
   - 5.10 UI Component Library
   - 5.11 Animations & UX Polish
   - 5.12 SEO & Conversion Optimization
   - 5.13 Advanced Features (Phase 2+)
6. [Technical Requirements](#6-technical-requirements)
7. [Information Architecture](#7-information-architecture)
8. [Design System & Theme](#8-design-system--theme)
9. [Non-Functional Requirements](#9-non-functional-requirements)
10. [Phased Roadmap](#10-phased-roadmap)
11. [Open Questions & Risks](#11-open-questions--risks)

---

## 1. Executive Summary

This PRD defines the full product requirements for **FureIn**, a modern, scalable furniture e‑commerce web platform. FureIn will serve customers who want to discover, visualize, and purchase high‑quality furniture (sofas, tables, chairs, beds, storage, lighting, décor, outdoor). The platform bridges the gap between online convenience and the tactile, spatial nature of furniture shopping – using rich media, detailed dimensions, material information, and future AR/3D previews. It also provides merchants and administrators with powerful catalog, order, and analytics tools.

The product must deliver a best‑in‑class shopping experience on both desktop and mobile, with strong emphasis on high‑resolution visuals, dimensional accuracy, trust (return policies, material guarantees), and conversion optimization. The UI/UX follows a minimal modern aesthetic with soft shadows, rounded cards (1rem radius), and smooth micro‑animations, fully integrated with Tailwind CSS and shadcn/ui component library.

---

## 2. Product Overview

### 2.1 Problem Statement

Buying furniture online is inherently difficult: customers cannot physically test comfort, judge scale, or feel materials. Generic e‑commerce platforms lack the specialised features needed – detailed dimension diagrams, material close‑ups, assembly instructions, and room‑scale visualisation. FureIn solves these pain points with a purpose‑built, furniture‑first experience.

### 2.2 Product Vision

> Make buying furniture online as confident and delightful as seeing it in person – by combining immersive visuals, precise product data, and human‑centric design.

### 2.3 Scope

**In Scope (Phase 1):**
- Public storefront (Homepage, PLP, PDP, Cart, Checkout)
- Authentication (Login, Register, Password Reset)
- User Dashboard (Orders, Wishlist, Profile)
- Admin Dashboard (Products, Orders, Analytics, Users)
- Responsive mobile experience (touch‑friendly, bottom navigation)
- Core UI component library (shadcn/ui + Tailwind)
- Furniture‑specific attributes: dimensions, materials, assembly info, care instructions

**Out of Scope (Phase 2+):**
- AR/3D product preview (room planner)
- AI‑based style recommendations
- Multi‑language support
- Installation & assembly service booking
- Virtual interior design consultation
- Subscription for fabric swatches

---

## 3. Goals & Success Metrics

### 3.1 Business Goals

| Goal | Target |
|---|---|
| Conversion rate | ≥ 2.5% (furniture average benchmark) |
| Return rate due to size mismatch | < 8% |
| Product detail page engagement (image zoom, dimension tab) | ≥ 70% of sessions |
| Page load speed (LCP) | < 2.5 seconds |
| Mobile traffic share | ≥ 55% |

### 3.2 Key Performance Indicators (KPIs)

- **Acquisition:** Sessions, Bounce Rate, Traffic Sources
- **Engagement:** Add‑to‑Cart Rate, Wishlist Saves, Dimension tab clicks
- **Conversion:** Checkout Completion Rate, Average Order Value (AOV)
- **Retention:** Repeat Purchase Rate, Newsletter Subscription Rate
- **Performance:** Core Web Vitals (LCP, FID, CLS), Time to Interactive

---

## 4. User Personas

### Persona 1 — The Homeowner (Emily, 34)
- **Device:** Tablet / Desktop
- **Goals:** Find a durable sofa that fits her living room dimensions. Wants detailed measurements, material swatches, and customer photos.
- **Pain Points:** Unclear dimensions, poor zoom on textures, hidden assembly requirements.

### Persona 2 — The Apartment Renter (James, 26)
- **Device:** Mobile
- **Goals:** Affordable, modular furniture that is easy to move. Fast checkout, clear delivery timeline.
- **Pain Points:** Unexpected shipping costs, complicated checkout, no “compact living” filters.

### Persona 3 — The Interior Designer (Priya, 42)
- **Device:** Desktop (large screen)
- **Goals:** Browse new collections, filter by style (Scandinavian, Industrial, Mid‑Century), bulk order, save product lists.
- **Pain Points:** No trade pricing (Phase 2), lack of high‑resolution CAD assets.

### Persona 4 — The Admin / Store Manager (Carlos)
- **Role:** Internal
- **Goals:** Manage SKUs with dimensions, materials, inventory. Process returns due to damage. Track best‑selling styles.
- **Pain Points:** Slow bulk upload, missing dimension fields, no low‑stock alerts.

---

## 5. Feature Sections & Requirements

---

### 5.1 Homepage

**Purpose:** Create an inspiring, trustworthy first impression that drives category exploration and seasonal campaigns.

**Recommended Section Order (from UI/UX Best Practices):**
1. Navigation Bar
2. Hero Banner
3. Featured Categories
4. Flash Sale (Clearance / Seasonal)
5. Trending Products
6. Promotional Banner (e.g., “Free delivery on orders over $800”)
7. Best Sellers
8. Customer Reviews (with user‑submitted room photos)
9. Brand Logos
10. Newsletter Sign‑up
11. Footer

---

#### 5.1.1 Navigation Bar

| Req ID | Description | Priority |
|--------|-------------|----------|
| NAV-01 | Brand logo (left‑aligned) linking to homepage | Must Have |
| NAV-02 | Prominent search bar with autocomplete (product name, collection, material) | Must Have |
| NAV-03 | Categories dropdown (Sofas, Tables, Chairs, Beds, Storage, Lighting, Décor, Outdoor) with mega‑menu showing subcategories | Must Have |
| NAV-04 | Cart icon with live item count badge | Must Have |
| NAV-05 | Wishlist icon with item count badge | Must Have |
| NAV-06 | User profile icon (changes to avatar when logged in) | Must Have |
| NAV-07 | Hamburger menu on mobile (< 768px) | Must Have |
| NAV-08 | Sticky navbar on scroll (reduces height) | Should Have |
| NAV-09 | Search bar expands to full‑width on mobile with cancel button | Should Have |

---

#### 5.1.2 Hero Section

| Req ID | Description | Priority |
|--------|-------------|----------|
| HERO-01 | Full‑width banner supporting high‑res lifestyle image or video (autoplay muted) | Must Have |
| HERO-02 | Main headline (H1) – seasonal campaign (e.g., “Summer Comfort Sale”) | Must Have |
| HERO-03 | Sub‑headline (max 2 lines) describing the offer or value prop (“Up to 30% off sofas + free swatch kit”) | Must Have |
| HERO-04 | Primary CTA button (“Shop the Sale”) with high contrast | Must Have |
| HERO-05 | Auto‑playing carousel (3–5 slides) with manual arrows and slide indicators | Should Have |
| HERO-06 | Overlay showing discount percentage or free shipping threshold | Should Have |

---

#### 5.1.3 Featured Categories Section

| Req ID | Description | Priority |
|--------|-------------|----------|
| CAT-01 | Display 6–8 top categories: Sofas, Tables, Chairs, Beds, Storage, Lighting, Décor, Outdoor | Must Have |
| CAT-02 | Each category card = lifestyle image + category name + (optional) product count | Must Have |
| CAT-03 | Clicking a category navigates to PLP pre‑filtered by that category | Must Have |
| CAT-04 | Horizontal scroll on mobile with snap points | Should Have |

---

#### 5.1.4 Product Showcase Sections (Trending, Best Sellers, New Arrivals)

| Req ID | Description | Priority |
|--------|-------------|----------|
| SHOW-01 | “Trending Now” – horizontally scrollable product row using `Product Card` component | Must Have |
| SHOW-02 | “Best Sellers” – based on last 30 days sales | Must Have |
| SHOW-03 | “New Arrivals” – products added in last 4 weeks | Must Have |
| SHOW-04 | “Flash Sale” – countdown timer + limited stock messaging | Must Have |
| SHOW-05 | “Curated for You” – simple rule‑based (by category browsing) | Should Have |
| SHOW-06 | Each product shows: image, title, price, discount badge, rating, quick‑view icon | Must Have |

---

#### 5.1.5 Promotional Sections

| Req ID | Description | Priority |
|--------|-------------|----------|
| PROMO-01 | Full‑width banner between sections (e.g., “Bundle & Save: Sofa + Coffee Table”) | Must Have |
| PROMO-02 | Limited‑time clearance event with countdown and progress bar (stock % left) | Must Have |
| PROMO-03 | Free shipping threshold banner (e.g., “Spend $49 more for free shipping”) | Should Have |
| PROMO-04 | Highlight a revolving coupon card (e.g., “FUREIN10” for 10% off) | Should Have |

---

#### 5.1.6 Trust Elements

| Req ID | Description | Priority |
|--------|-------------|----------|
| TRUST-01 | Aggregate star rating + total reviews near product sections | Must Have |
| TRUST-02 | Secure payment icons (Visa, Mastercard, Amex, PayPal, Afterpay) | Must Have |
| TRUST-03 | Delivery snippet (“Free delivery over $800 • 30‑day returns”) | Must Have |
| TRUST-04 | Customer review carousel with user‑submitted photos of furniture in real homes | Must Have |
| TRUST-05 | Brand partner logos (e.g., “Certified Sustainable Wood”, “GREENGUARD Gold”) | Should Have |

---

#### 5.1.7 Footer

| Req ID | Description | Priority |
|--------|-------------|----------|
| FOOT-01 | Links: About Us, Contact, FAQ, Track Order, Returns, Privacy, Terms | Must Have |
| FOOT-02 | Social icons (Instagram, Pinterest, Facebook, YouTube) – furniture thrives on visuals | Must Have |
| FOOT-03 | Newsletter subscription: email input + subscribe button (integrate with CRM) | Must Have |
| FOOT-04 | Payment method icons + security badges | Must Have |
| FOOT-05 | Copyright text with year, “FureIn” | Must Have |

---

### 5.2 Product Listing Page (PLP / Shop Page)

**Purpose:** Allow customers to filter, sort, and discover furniture by attributes critical to purchase decisions (dimensions, material, style).

---

#### 5.2.1 Filters Sidebar

| Req ID | Description | Priority |
|--------|-------------|----------|
| FIL-01 | Price range slider (min/max) with live value display | Must Have |
| FIL-02 | Category tree (multi‑select checkboxes) | Must Have |
| FIL-03 | Material (Wood, Metal, Fabric, Leather, Velvet, Marble, etc.) – multi‑select | Must Have |
| FIL-04 | Color swatch filter (hex + name) | Must Have |
| FIL-05 | Style (Modern, Scandinavian, Industrial, Mid‑Century, Bohemian, Minimalist) | Must Have |
| FIL-06 | Dimensions: preset ranges for width/depth/height (e.g., “Under 30””, “30”-60””, “Over 60””) | Must Have |
| FIL-07 | Star rating (4+ stars, 3+ stars) | Must Have |
| FIL-08 | Availability (In Stock / Made to Order / Out of Stock) | Must Have |
| FIL-09 | Applied filters displayed as removable chips | Must Have |
| FIL-10 | “Clear All Filters” button | Must Have |
| FIL-11 | Collapsible filter drawer on mobile (slide‑in) | Must Have |

---

#### 5.2.2 Sorting

| Req ID | Description | Priority |
|--------|-------------|----------|
| SORT-01 | Price: Low to High / High to Low | Must Have |
| SORT-02 | Popularity (most viewed / most purchased) | Must Have |
| SORT-03 | Newest Arrivals | Must Have |
| SORT-04 | Rating (highest first) | Should Have |
| SORT-05 | Persist sort preference during session | Should Have |

---

#### 5.2.3 Product Grid

| Req ID | Description | Priority |
|--------|-------------|----------|
| GRID-01 | Responsive grid: 4 cols (desktop) → 2 cols (tablet) → 2 cols (mobile) | Must Have |
| GRID-02 | **Product card structure** (per UI/UX best practices): image (1:1 ratio), discount badge (top‑left), wishlist icon (top‑right), product title (max 2 lines), material & dimension snippet, star rating + count, price (with strikethrough original), “Add to Cart” button | Must Have |
| GRID-03 | Quick View modal triggered by magnifying glass icon on hover | Must Have |
| GRID-04 | Hover animation: card scales up slightly (1.02) + shadow elevation | Must Have |
| GRID-05 | Skeleton loading state while fetching | Must Have |
| GRID-06 | “Out of Stock” overlay with “Notify Me” button (collect email) | Must Have |
| GRID-07 | Toggle between Grid View and List View (list view shows dimensions inline) | Nice to Have |

---

#### 5.2.4 Pagination

| Req ID | Description | Priority |
|--------|-------------|----------|
| PAG-01 | Page number navigation with prev/next buttons | Must Have |
| PAG-02 | “Load More” button (infinite scroll optional on mobile) | Should Have |
| PAG-03 | Total results count displayed (e.g., “147 products”) | Must Have |

---

### 5.3 Product Details Page (PDP)

**Purpose:** Provide every detail needed to confidently buy furniture: visuals, dimensions, materials, assembly, and real‑customer proof.

---

#### 5.3.1 Main Product Section

| Req ID | Description | Priority |
|--------|-------------|----------|
| PDP-01 | Gallery: 5–8 high‑resolution images (lifestyle, detail, scale, color variants) | Must Have |
| PDP-02 | Image zoom on hover (desktop) + pinch zoom (mobile) | Must Have |
| PDP-03 | Thumbnail strip below main image | Must Have |
| PDP-04 | Product title (H1) and short description (material, key features) | Must Have |
| PDP-05 | Current price + original price + discount % | Must Have |
| PDP-06 | Star rating + review count (links to Reviews tab) | Must Have |
| PDP-07 | Stock status: “In Stock”, “Low Stock (only X left)”, “Made to Order (ships in 2‑3 weeks)”, “Out of Stock” | Must Have |
| PDP-08 | Variant selector: Color, Size (e.g., “Queen”, “King”), Leg finish etc. – with visual swatches | Must Have |
| PDP-09 | Quantity selector (stepper) – limit based on stock | Must Have |
| PDP-10 | **Dimensions widget**: simple line drawing showing width, depth, height + “Download spec sheet” | Must Have |
| PDP-11 | Primary CTA “Add to Cart” (prominent) | Must Have |
| PDP-12 | Secondary CTA “Buy Now” (skip cart -> checkout) | Must Have |
| PDP-13 | Wishlist save button (heart icon) | Must Have |
| PDP-14 | Share buttons (WhatsApp, Pinterest, Facebook, Copy Link) – Pinterest important for furniture | Should Have |
| PDP-15 | Estimated delivery (based on zipcode + stock status) | Must Have |
| PDP-16 | “Arrange a video consultation” (Phase 1 as link to schedule) | Should Have |

---

#### 5.3.2 Product Information Tabs

| Req ID | Description | Priority |
|--------|-------------|----------|
| TAB-01 | **Description** – rich text, storytelling, highlights (e.g., “Handcrafted from solid oak”) | Must Have |
| TAB-02 | **Specifications** – structured table: Weight, Assembly required (Yes/No), Material details, Warranty, Country of origin | Must Have |
| TAB-03 | **Dimensions** – detailed diagram (image or SVG) with all measurements, clearance recommendations | Must Have |
| TAB-04 | **Care Instructions** – how to clean, avoid direct sunlight, etc. | Must Have |
| TAB-05 | **Reviews** – average rating breakdown, customer photos, sort by most helpful | Must Have |
| TAB-06 | **Shipping & Returns** – transit times, return window, restocking fee if any, assembly service option | Must Have |

---

#### 5.3.3 Review System (within Reviews Tab)

| Req ID | Description | Priority |
|--------|-------------|----------|
| REV-01 | Overall star rating + percentage breakdown (1–5 stars) | Must Have |
| REV-02 | Review cards: reviewer name (anonymised optional), date, star rating, title, comment, **user‑submitted image** thumbnail | Must Have |
| REV-03 | “Verified Purchase” badge on eligible reviews | Must Have |
| REV-04 | Helpful / Not helpful voting | Nice to Have |
| REV-05 | Submit review form (authenticated users, can upload up to 3 photos) | Must Have |
| REV-06 | Filter reviews by star rating, by photos | Should Have |

---

#### 5.3.4 Extra Sections (Below the Fold)

| Req ID | Description | Priority |
|--------|-------------|----------|
| EXT-01 | “Complete the Look” – related products (e.g., coffee table to match sofa) | Must Have |
| EXT-02 | “Frequently Bought Together” – bundle with discount | Should Have |
| EXT-03 | “Recently Viewed” – persist across session | Should Have |
| EXT-04 | Product video embed (assembly guide, designer walkthrough) | Nice to Have |
| EXT-05 | FAQ accordion (e.g., “What’s the weight capacity?”, “Can it be used outdoors?”) | Should Have |

---

### 5.4 Shopping Cart Page

**Purpose:** Summarise selected items, show savings, and encourage continuation to checkout.

---

#### 5.4.1 Cart Items List

| Req ID | Description | Priority |
|--------|-------------|----------|
| CART-01 | Product thumbnail, title, variant (color/size), unit price | Must Have |
| CART-02 | Quantity stepper (+/−) with stock‑aware limits | Must Have |
| CART-03 | Remove item button with confirmation modal | Must Have |
| CART-04 | Line item subtotal (unit price × quantity) | Must Have |
| CART-05 | “Save for Later” – moves item to a separate wishlist section | Should Have |
| CART-06 | Ability to add assembly service (add‑on product) per cart item | Should Have |

---

#### 5.4.2 Cart Summary Panel

| Req ID | Description | Priority |
|--------|-------------|----------|
| SUM-01 | Subtotal, shipping estimate (enter zipcode), discounts, taxes, total | Must Have |
| SUM-02 | Coupon/promo code input with apply button and error state | Must Have |
| SUM-03 | Delivery date estimate (based on zipcode, stock) | Should Have |
| SUM-04 | Proceed to Checkout button (primary CTA) | Must Have |
| SUM-05 | Continue Shopping link (returns to PLP or last browsed category) | Must Have |
| SUM-06 | Free shipping progress bar – dynamic (e.g., “Add $120 more for free delivery”) | Should Have |

---

#### 5.4.3 Empty Cart State

| Req ID | Description | Priority |
|--------|-------------|----------|
| EMPTY-01 | Illustration of empty room + message (“Your room is waiting for furniture”) | Must Have |
| EMPTY-02 | CTA button: “Explore Best Sellers” | Must Have |

---

### 5.5 Checkout Page

**Purpose:** Convert cart to order with minimal friction while collecting necessary delivery details.

---

#### 5.5.1 Progress Indicator

| Req ID | Description | Priority |
|--------|-------------|----------|
| PROG-01 | Step indicator: Cart → Information → Shipping → Payment → Confirmation | Must Have |
| PROG-02 | Current step highlighted, completed steps checkmarked | Must Have |

---

#### 5.5.2 Customer Information Step

| Req ID | Description | Priority |
|--------|-------------|----------|
| INFO-01 | Fields: Full name, Email, Phone number | Must Have |
| INFO-02 | Address fields: Street address, Apartment/unit, City, State/Province, ZIP, Country | Must Have |
| INFO-03 | Option to save address to user account (if logged in) | Should Have |
| INFO-04 | Guest checkout (no account required) | Must Have |
| INFO-05 | Autofill from saved addresses for logged‑in users | Should Have |
| INFO-06 | Inline validation (real‑time) with clear error messages | Must Have |

---

#### 5.5.3 Shipping Step

| Req ID | Description | Priority |
|--------|-------------|----------|
| SHIP-01 | Display delivery options: Standard (5‑7 business days), Express (2‑3 business days), White‑Glove Assembly (additional fee) | Must Have |
| SHIP-02 | Show shipping fee and estimated delivery window per option | Must Have |
| SHIP-03 | Visually indicate selected option | Must Have |

---

#### 5.5.4 Payment Step

| Req ID | Description | Priority |
|--------|-------------|----------|
| PAY-01 | Credit / Debit card (via Stripe / Braintree) | Must Have |
| PAY-02 | PayPal / Digital wallets (Apple Pay, Google Pay) | Must Have |
| PAY-03 | Buy Now Pay Later (Afterpay, Klarna) – increases AOV for furniture | Should Have |
| PAY-04 | Cash on Delivery – limited to small items if applicable | Optional |
| PAY-05 | “Place Order” button (disabled until all fields valid) | Must Have |
| PAY-06 | Security badges + SSL during payment entry | Must Have |

---

#### 5.5.5 Order Summary (Persistent Sidebar)

| Req ID | Description | Priority |
|--------|-------------|----------|
| OSUM-01 | Product list with thumbnails, quantities, price each | Must Have |
| OSUM-02 | Subtotal, shipping, discount, taxes, total | Must Have |
| OSUM-03 | Collapsible on mobile to save vertical space | Should Have |

---

#### 5.5.6 Order Confirmation Page

| Req ID | Description | Priority |
|--------|-------------|----------|
| CONF-01 | Order number and thank‑you message | Must Have |
| CONF-02 | Order summary recap (items, shipping address, estimated delivery) | Must Have |
| CONF-03 | Delivery tracking link (when available) | Must Have |
| CONF-04 | Links: Continue Shopping, View Order in Dashboard | Must Have |
| CONF-05 | Auto‑trigger email confirmation with receipt and delivery estimate | Must Have |

---

### 5.6 Authentication Pages

**Purpose:** Secure, frictionless access for new and returning customers.

#### 5.6.1 Login Page

| Req ID | Description | Priority |
|--------|-------------|----------|
| AUTH-01 | Email + password form | Must Have |
| AUTH-02 | Show/Hide password toggle | Must Have |
| AUTH-03 | “Forgot password?” link (email reset flow) | Must Have |
| AUTH-04 | Google OAuth login (optional) / Facebook login | Should Have |
| AUTH-05 | Redirect to originally intended page after login | Must Have |
| AUTH-06 | “Don’t have an account? Register” link | Must Have |

#### 5.6.2 Register Page

| Req ID | Description | Priority |
|--------|-------------|----------|
| AUTH-07 | Fields: Full name, Email, Password, Phone (optional) | Must Have |
| AUTH-08 | Password strength meter (Weak / Fair / Strong) | Should Have |
| AUTH-09 | Real‑time validation (email format, password length >=8) | Must Have |
| AUTH-10 | Terms & Privacy Policy checkbox | Must Have |
| AUTH-11 | “Already have an account? Login” link | Must Have |

#### 5.6.3 Password Reset Flow

| Req ID | Description | Priority |
|--------|-------------|----------|
| AUTH-12 | Enter email to receive reset link | Must Have |
| AUTH-13 | Secure, time‑expiring token sent via email | Must Have |
| AUTH-14 | New password + confirm password form | Must Have |
| AUTH-15 | Success/error toast notification | Must Have |

---

### 5.7 User Dashboard

**Purpose:** Give customers control over orders, saved items, and personal data.

#### 5.7.1 Profile Management

| Req ID | Description | Priority |
|--------|-------------|----------|
| USR-01 | View/edit: Name, Email, Phone, Profile picture | Must Have |
| USR-02 | Manage saved addresses (add, edit, delete, set default) | Must Have |
| USR-03 | Profile picture upload with cropping | Should Have |

#### 5.7.2 Order Management

| Req ID | Description | Priority |
|--------|-------------|----------|
| USR-04 | Order history list: Order ID, Date, Total, Status (with color coding) | Must Have |
| USR-05 | Order detail view: items, shipping address, timeline, tracking link | Must Have |
| USR-06 | Real‑time status tracking: Order Confirmed → Processing → Shipped → Out for Delivery → Delivered | Must Have |
| USR-07 | Invoice / receipt download (PDF) | Should Have |
| USR-08 | “Reorder” button – adds all items to cart | Should Have |
| USR-09 | Initiate return or exchange from order detail (with reason selection) | Must Have |

#### 5.7.3 Wishlist

| Req ID | Description | Priority |
|--------|-------------|----------|
| USR-10 | View all wishlisted products with current price and stock status | Must Have |
| USR-11 | Move a product to cart directly (one click) | Must Have |
| USR-12 | Remove items | Must Have |
| USR-13 | Price drop notification (email) for wishlisted items | Nice to Have |

#### 5.7.4 Account Settings

| Req ID | Description | Priority |
|--------|-------------|----------|
| USR-14 | Change password | Must Have |
| USR-15 | Notification preferences (Email: order updates, promotional, price drops) | Should Have |
| USR-16 | Saved payment methods (only for authenticated returning users) | Should Have |
| USR-17 | Account deletion request with confirmation | Should Have |

---

### 5.8 Admin Dashboard

**Purpose:** Provide store operators with complete control over furniture catalog, orders, inventory, and performance.

#### 5.8.1 Product Management

| Req ID | Description | Priority |
|--------|-------------|----------|
| ADM-01 | Product list with search, category filter, stock filter | Must Have |
| ADM-02 | Add/edit product form: Title, Description, Images (drag‑and‑drop), Price, SKU, Category, Material, Dimensions (L/W/H), Weight, Assembly required flag, Warranty, Tags | Must Have |
| ADM-03 | Manage product variants (color, size, leg finish) – each variant can have its own image, price, stock | Must Have |
| ADM-04 | Bulk import via CSV/Excel (with dimension fields) | Should Have |
| ADM-05 | Low‑stock alerts (configurable threshold) | Must Have |
| ADM-06 | Soft‑delete / archive products | Must Have |
| ADM-07 | Manage categories & subcategories | Must Have |

#### 5.8.2 Order Management

| Req ID | Description | Priority |
|--------|-------------|----------|
| ADM-09 | Orders list with status filters, date range, search by order ID/customer | Must Have |
| ADM-10 | Order detail view (customer info, items, payment status) | Must Have |
| ADM-11 | Update order status manually (e.g., mark as shipped, add tracking number) | Must Have |
| ADM-12 | Process refunds / cancellations (partial or full) | Must Have |
| ADM-13 | Print packing slip / invoice | Should Have |
| ADM-14 | Bulk status update (e.g., mark multiple as shipped) | Should Have |

#### 5.8.3 Analytics Dashboard

| Req ID | Description | Priority |
|--------|-------------|----------|
| ADM-15 | Revenue overview: Today, 7 days, 30 days, custom range | Must Have |
| ADM-16 | Sales chart (line/bar) with dimensions: by category, by product | Must Have |
| ADM-17 | Top‑selling products list (quantity and revenue) | Must Have |
| ADM-18 | Stock turnover report | Should Have |
| ADM-19 | Conversion funnel (sessions → add to cart → checkout → purchase) | Nice to Have |
| ADM-20 | Export reports as CSV / PDF | Should Have |

#### 5.8.4 User Management

| Req ID | Description | Priority |
|--------|-------------|----------|
| ADM-21 | Customer list with search, filters (date joined, order count) | Must Have |
| ADM-22 | View individual customer profile + order history | Must Have |
| ADM-23 | Role management (Admin, Catalog Manager, Support, Warehouse) | Must Have |
| ADM-24 | Suspend / activate user accounts | Must Have |

#### 5.8.5 Promotions & Coupons

| Req ID | Description | Priority |
|--------|-------------|----------|
| ADM-25 | Create coupon codes: percentage or fixed amount, apply to specific categories/products | Must Have |
| ADM-26 | Set expiry date, usage limit (per user or globally) | Must Have |
| ADM-27 | Flash sale creation: start/end time, discounted products | Must Have |
| ADM-28 | Coupon usage analytics (redemption count, revenue attributed) | Should Have |

---

### 5.9 Mobile UI/UX

**Purpose:** Deliver a flawless mobile experience – the majority of furniture browsing starts on mobile.

| Req ID | Description | Priority |
|--------|-------------|----------|
| MOB-01 | Fully responsive layout using mobile‑first breakpoints (375px → 768px → 1024px → 1280px) | Must Have |
| MOB-02 | Bottom navigation bar: Home, Shop, Wishlist, Cart, Profile (replaces top nav on mobile) | Should Have |
| MOB-03 | Touch‑friendly tap targets: minimum 44×44px | Must Have |
| MOB-04 | Swipe gestures on image carousels and horizontal product rows | Should Have |
| MOB-05 | Lazy loading all images below the fold | Must Have |
| MOB-06 | Serve optimized WebP images with srcset | Must Have |
| MOB-07 | Collapsible filter drawer on PLP (slide from left/right) | Must Have |
| MOB-08 | Sticky “Add to Cart” bar on PDP (shows price and “Add to Cart” button when scrolled) | Must Have |
| MOB-09 | Tap‑to‑call support number on contact page | Should Have |

---

### 5.10 UI Component Library

**Purpose:** Ensure consistent, reusable design language across the platform. All components follow shadcn/ui patterns and Tailwind CSS utilities.

#### Product Card Structure (Furniture‑Optimised)

1. Product Image (aspect ratio 1:1, object‑fit cover)
2. Discount Badge (top‑left) – red gradient
3. Wishlist Icon (top‑right, heart toggle)
4. Product Title (max 2 lines, truncate)
5. Material & Dimension snippet (e.g., “Solid Oak • W: 35””)
6. Star Rating + review count
7. Price (current + original strikethrough)
8. Add to Cart Button (full width on mobile)

#### Core Components List

| Component | Variants |
|-----------|----------|
| **Product Card** | Default (grid), Compact (list view), Horizontal (used in cart) |
| **Dimension Widget** | Simple line diagram, spec sheet link |
| **Review Card** | With photo thumbnail, text‑only |
| **Category Card** | Image + label, icon + label |
| **Promo Banner** | Full‑width, dismissible |
| **Primary Button** | Solid, loading, disabled |
| **Secondary Button** | Outline, ghost |
| **Search Input** | With autocomplete, with recent searches |
| **Quantity Stepper** | +/- buttons, manual input |
| **Filter Chip** | Removable, active state |
| **Quick View Modal** | Gallery thumbnail, variant picker, add to cart |
| **Toast Notification** | Success, error, warning, info – auto‑dismiss after 4s |
| **Skeleton Loader** | For product grid, PDP, cart |

---

### 5.11 Animations & UX Polish

| Req ID | Description | Priority |
|--------|-------------|----------|
| ANI-01 | Product card hover: scale(1.02) + box‑shadow `lg` – smooth `transition-all` duration‑200 | Must Have |
| ANI-02 | Page transitions: fade‑in when navigating between routes | Should Have |
| ANI-03 | Skeleton loading screens for all data‑fetched sections (PLP, PDP, Dashboard) | Must Have |
| ANI-04 | Add‑to‑Cart micro animation: item image flies to cart icon with bounce effect | Should Have |
| ANI-05 | Toast notifications slide from top‑right (desktop) or bottom (mobile) | Must Have |
| ANI-06 | Empty states: illustration + gentle fade‑in (cart, wishlist, orders) | Must Have |
| ANI-07 | Form error shake animation on invalid submission | Should Have |
| ANI-08 | Countdown timer (flash sale) with subtle pulse effect when low on time | Must Have |
| ANI-09 | Accordion expand/collapse (product tabs, FAQ) – smooth height transition | Should Have |

---

### 5.12 SEO & Conversion Optimization

#### SEO Requirements

| Req ID | Description | Priority |
|--------|-------------|----------|
| SEO-01 | Clean, semantic URLs: `/furniture/sofas/luxury-velvet-sofa` | Must Have |
| SEO-02 | Dynamic meta title (product title + brand) and meta description per page | Must Have |
| SEO-03 | Open Graph tags (`og:image`, `og:title`, `og:description`) for social sharing | Should Have |
| SEO-04 | Structured data (JSON‑LD) for products, reviews, and breadcrumbs (schema.org) | Should Have |
| SEO-05 | Auto‑generated sitemap.xml and robots.txt | Must Have |
| SEO-06 | Image `alt` attributes filled with product description | Must Have |

#### Conversion Optimization (CRO)

| Req ID | Description | Priority |
|--------|-------------|----------|
| CRO-01 | Sticky “Add to Cart” bar on PDP (when scrolled past main CTA) | Must Have |
| CRO-02 | Exit‑intent popup (desktop) showing 10% discount in exchange for email | Should Have |
| CRO-03 | Cross‑sell / upsell on Cart and Checkout (“Complete the Set”) | Should Have |
| CRO-04 | Countdown timer for flash sale items on PLP and PDP | Must Have |
| CRO-05 | Low‑stock messaging (“Only 3 left in stock”) on PDP | Should Have |
| CRO-06 | Free shipping progress bar in cart | Must Have |

---

### 5.13 Advanced Features (Phase 2+)

| Feature | Description |
|---------|-------------|
| **AR View / Room Planner** | Place 3D models of furniture in customer’s room via phone camera (using WebXR or 8th Wall) |
| **AI Style Recommender** | “You might also like” based on style preferences and browsing history |
| **Virtual Consultations** | Book a video call with design expert |
| **Assembly Service Booking** | Schedule professional assembly at checkout |
| **Trade Program** | Wholesale pricing for interior designers with dedicated login |
| **Multi‑language / Currency** | Support for multiple languages and local currencies |
| **Dark Mode** | System‑aware and manual toggle |
| **Affiliate / Referral** | Earn commission on referred sales |
| **Sustainability Badges** | Carbon‑neutral delivery, recycled materials certification |

---

## 6. Technical Requirements

### 6.1 Recommended Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| **State Management** | Zustand (lightweight) + React Query (server state) |
| **Backend / API** | Next.js API Routes or NestJS (for scalability) |
| **Database** | PostgreSQL + Prisma ORM |
| **Authentication** | NextAuth.js (credentials + Google OAuth) |
| **Payments** | Stripe (cards, Afterpay), PayPal, (optional local gateways) |
| **Image Hosting & CDN** | Cloudinary (with automatic WebP conversion) |
| **Search** | Algolia or Typesense (for fast facet filtering) |
| **Email** | Resend / SendGrid (order confirmations, password reset) |
| **Deployment** | Vercel (frontend), Railway (backend if separate) |

### 6.2 Browser & Device Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile: iOS Safari 15+, Android Chrome 110+
- Tablet: iPadOS Safari, Android Chrome

---

## 7. Information Architecture

```
/ (Homepage)
├── /shop (PLP)
│   ├── /shop/sofas
│   ├── /shop/tables
│   └── /shop/[category]
├── /product/[slug] (PDP)
├── /cart
├── /checkout
│   └── /checkout/success
├── /auth
│   ├── /auth/login
│   ├── /auth/register
│   └── /auth/forgot-password
├── /dashboard
│   ├── /dashboard/profile
│   ├── /dashboard/orders
│   ├── /dashboard/orders/[id]
│   ├── /dashboard/wishlist
│   └── /dashboard/settings
└── /admin
    ├── /admin/products
    ├── /admin/orders
    ├── /admin/analytics
    ├── /admin/users
    └── /admin/promotions
```

---

## 8. Design System & Theme

### 8.1 Design Style

- **Primary Style:** Minimal modern with soft shadows and generous rounded corners (`radius = 1rem` as per CSS variables). 
- **Inspiration:** Apple‑level clarity, bento grid for categories, warm neutrals + natural wood accents.
- **Typography:** DM Sans (headings) + Geist (body) – clean, highly legible.
- **Elevation system:** `shadow-2xs` for cards, `shadow-md` for modals, `shadow-xl` for dropdowns.

### 8.2 Color Palette (FureIn Brand)

The platform uses Tailwind CSS with shadcn/ui theming. Override CSS variables for furniture brand:

| Token | Usage | Hex / Oklch |
|-------|-------|--------------|
| `--color-primary` | Primary CTAs, active states | `#4A3728` (Warm walnut) |
| `--color-primary-dark` | Hover states | `#3B2A1E` |
| `--color-accent` | Flash sale, limited offers | `#D97706` (Amber) |
| `--color-success` | In stock, order confirmation | `#2B6E3C` |
| `--color-background` | Page background | `#FDF8F2` (Warm off‑white) |
| `--color-surface` | Cards, modals | `#FFFFFF` |
| `--color-text` | Body text | `#1C1917` |
| `--color-muted` | Secondary text, labels | `#78716C` |
| `--color-border` | Dividers, inputs | `#E7E5E4` |

*(Note: Dark mode variables follow similar contrast with darker walnut and off‑black.)*

### 8.3 Component Tokens (from provided CSS)

```css
:root {
  --radius: 1rem;          /* all components use rounded-xl/2xl */
  --font-sans: "DM Sans", system-ui, sans-serif;
  --shadow-md: 0 4px 12px -2px rgb(0 0 0 / 0.08);
}
```

All interactive elements have `transition: all 0.2s ease`.

---

## 9. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Performance** | LCP < 2.5s, TTI < 3.5s, CLS < 0.1 on mobile 4G |
| **Scalability** | Handle 10,000 concurrent users (especially during flash sales) |
| **Security** | HTTPS enforced, CSRF protection, input sanitisation, rate limiting on auth endpoints |
| **Availability** | 99.9% uptime SLA (excluding planned maintenance) |
| **Accessibility** | WCAG 2.1 AA: sufficient contrast, keyboard navigation, ARIA labels, focus indicators |
| **SEO** | Server‑rendered (SSR/SSG) for all product and category pages |
| **Data Privacy** | GDPR‑aligned cookie consent, no tracking without opt‑in |
| **Maintainability** | > 70% unit test coverage for cart, checkout, and auth flows |

---

## 10. Phased Roadmap

### Phase 1 — Core Platform (Months 1–3)
- Homepage (all sections per best order)
- PLP with filters (material, dimensions, style)
- PDP with dimension widget, image gallery, tabs
- Shopping Cart + Checkout (Stripe + PayPal)
- Authentication (login/register/password reset)
- User Dashboard (orders, wishlist, profile)
- Admin Dashboard (products, orders, basic analytics)
- Responsive mobile UI with bottom navigation
- Core component library (shadcn/ui)

### Phase 2 — Growth & Optimisation (Months 4–6)
- Admin coupons, flash sales, promotions
- SEO: structured data, sitemap, dynamic OG tags
- CRO features (exit intent, upsell, sticky add‑to‑cart)
- Customer review system with photo upload
- Email notifications (order, shipping, abandoned cart)
- Invoice PDF download
- Dark mode toggle

### Phase 3 — Immersive & Scale (Months 7–12)
- AR / 3D product preview (WebXR)
- AI‑powered recommendations (“You might also like”)
- Multi‑language (English, Spanish, etc.) – i18n
- Affiliate & referral program
- Trade / wholesale portal
- Advanced analytics dashboard with product‑level KPIs

---

## 11. Open Questions & Risks

| # | Question / Risk | Owner | Status |
|---|----------------|-------|--------|
| 1 | Will we support White‑Glove delivery assembly integration with third‑party logistics? | Product | Open |
| 2 | What is the average number of product variants (color, size) per furniture SKU? Affects admin UI. | Ops | Open |
| 3 | CDN cost estimation for high‑resolution product images (lifestyle + zoom). | Tech Lead | Open |
| 4 | AR feature: should we build in‑house or use a vendor (e.g., Augment, 8th Wall)? | CTO | Open |
| 5 | Return logistics: how to handle large furniture returns (restocking, pickup)? | Operations | Open |
| 6 | Peak traffic estimation for Black Friday furniture sales. | Marketing | Open |

---

*This PRD is a living document. All requirements should be reviewed and prioritised in sprint planning with engineering and design leads before implementation. For UI/UX consistency, refer to the shadcn/ui Storybook and FureIn design tokens.*