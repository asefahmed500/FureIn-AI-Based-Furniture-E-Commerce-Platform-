# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: guest-checkout.spec.ts >> guest checkout flow
- Location: e2e\guest-checkout.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Acquisition Successful/i)
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByText(/Acquisition Successful/i)

```

```yaml
- text: ✦ Free delivery on orders over $800 • 30-day easy returns ✦
- banner:
  - link "F FureIn Crafting Comfort":
    - /url: /
  - navigation:
    - navigation "Main":
      - list:
        - listitem:
          - button "Categories"
    - link "New Arrivals":
      - /url: /shop?sort=newest
    - link "Best Sellers":
      - /url: /shop?sort=popular
    - link "Sale HOT":
      - /url: /shop?sale=true
  - textbox "Search furniture..."
  - link "0 Wishlist":
    - /url: /dashboard/wishlist
    - button "0 Wishlist"
  - link "Shopping cart":
    - /url: /cart
    - button "Shopping cart"
  - link "Sign In":
    - /url: /login
    - button "Sign In"
- banner:
  - navigation "Breadcrumb":
    - list:
      - listitem:
        - link "Home":
          - /url: /
      - listitem: /
      - listitem: Shop
  - heading "Architectural Furniture Catalog" [level=1]
  - paragraph: Deliberate materials, uncompromising construction, and harmonious design silhouettes created to elevate your living environments.
- main:
  - textbox "Search Catalog":
    - /placeholder: Search catalog...
  - complementary:
    - heading "Filters" [level=2]
    - heading "Category" [level=3]
    - button "All Categories"
    - button "Sofas & Sectionals (2)"
    - button "Living & Dining Tables (1)"
    - button "Chairs & Seating (1)"
    - button "Beds & Bedroom (1)"
    - button "Storage & Media (0)"
    - button "Lighting Fixtures (0)"
    - button "Curated Décor (0)"
    - button "Outdoor Living (0)"
    - heading "Max Price" [level=3]
    - text: $3000
    - slider "Max Price Range Slider": "3000"
    - text: $100 $3,000
    - heading "Materials" [level=3]
    - button "Velvet"
    - button "Wood"
    - button "Fabric"
    - button "Metal"
    - button "Marble"
    - button "Leather"
    - heading "Availability" [level=3]
    - text: In Stock Only
    - checkbox "In Stock Only"
  - paragraph: Showing 5 artisanal pieces
  - text: "Sort by:"
  - combobox "Sort by:":
    - option "Featured" [selected]
    - option "Newest Arrivals"
    - 'option "Price: Low to High"'
    - 'option "Price: High to Low"'
    - option "Highest Rated"
  - button "Grid View"
  - button "List View"
  - link "Aethel Platform Bed Frame Toggle Wishlist":
    - /url: /product/aethel-platform-bed
    - img "Aethel Platform Bed Frame"
    - button "Toggle Wishlist"
  - text: Wood, Fabric 66"W × 86"D × 42"H
  - link "Aethel Platform Bed Frame":
    - /url: /product/aethel-platform-bed
    - heading "Aethel Platform Bed Frame" [level=3]
  - text: (0) $1299
  - button "Add"
  - link "Verona Emerald Velvet Sofa Toggle Wishlist":
    - /url: /product/verona-emerald-velvet-sofa
    - img "Verona Emerald Velvet Sofa"
    - button "Toggle Wishlist"
  - text: Velvet, Metal 88"W × 36"D × 31"H
  - link "Verona Emerald Velvet Sofa":
    - /url: /product/verona-emerald-velvet-sofa
    - heading "Verona Emerald Velvet Sofa" [level=3]
  - text: (0) $1899
  - button "Add"
  - link "Horizon Fabric Sectional Sofa Toggle Wishlist":
    - /url: /product/horizon-fabric-sectional-sofa
    - img "Horizon Fabric Sectional Sofa"
    - button "Toggle Wishlist"
  - text: Fabric, Wood 112"W × 64"D × 32"H
  - link "Horizon Fabric Sectional Sofa":
    - /url: /product/horizon-fabric-sectional-sofa
    - heading "Horizon Fabric Sectional Sofa" [level=3]
  - text: (0) $2499
  - button "Add"
  - link "Nordic Slatted Oak Coffee Table Toggle Wishlist":
    - /url: /product/minimalist-slatted-coffee-table
    - img "Nordic Slatted Oak Coffee Table"
    - button "Toggle Wishlist"
  - text: Wood 48"W × 24"D × 16"H
  - link "Nordic Slatted Oak Coffee Table":
    - /url: /product/minimalist-slatted-coffee-table
    - heading "Nordic Slatted Oak Coffee Table" [level=3]
  - text: (0) $499
  - button "Add"
  - link "Aura Velvet Accent Chair Toggle Wishlist":
    - /url: /product/luxury-velvet-accent-chair
    - img "Aura Velvet Accent Chair"
    - button "Toggle Wishlist"
  - text: Velvet, Wood 32"W × 34"D × 33"H
  - link "Aura Velvet Accent Chair":
    - /url: /product/luxury-velvet-accent-chair
    - heading "Aura Velvet Accent Chair" [level=3]
  - text: (0) $649
  - button "Add"
- contentinfo:
  - link "F FureIn Crafting Comfort":
    - /url: /
  - paragraph: Handcrafted premium furniture designed for living beautifully. Exceptional materials, masterful craftsmanship, and timeless aesthetics anchored to your lifestyle.
  - text: Stay Inspired
  - textbox "Stay Inspired":
    - /placeholder: Enter your email address
  - button "Subscribe"
  - text: Subscribe for private invitations, design concepts, and 10% off your first order.
  - heading "Company" [level=3]
  - list:
    - listitem:
      - link "About Us":
        - /url: /about
    - listitem:
      - link "Our Story & Craft":
        - /url: /story
    - listitem:
      - link "Sustainability":
        - /url: /sustainability
    - listitem:
      - link "Showrooms":
        - /url: /showrooms
    - listitem:
      - link "Careers":
        - /url: /careers
  - heading "Shop" [level=3]
  - list:
    - listitem:
      - link "Living Room":
        - /url: /shop/sofas
    - listitem:
      - link "Dining Room":
        - /url: /shop/tables
    - listitem:
      - link "Bedroom":
        - /url: /shop/beds
    - listitem:
      - link "Home Office":
        - /url: /shop/storage
    - listitem:
      - link "Lighting & Décor":
        - /url: /shop/lighting
  - heading "Support" [level=3]
  - list:
    - listitem:
      - link "Customer Service":
        - /url: /support
    - listitem:
      - link "Track Your Order":
        - /url: /dashboard/orders
    - listitem:
      - link "Shipping & Delivery":
        - /url: /shipping
    - listitem:
      - link "Returns & Exchanges":
        - /url: /returns
    - listitem:
      - link "Care Guide":
        - /url: /care
  - heading "Legal" [level=3]
  - list:
    - listitem:
      - link "Terms of Service":
        - /url: /terms
    - listitem:
      - link "Privacy Policy":
        - /url: /privacy
    - listitem:
      - link "Cookie Settings":
        - /url: /cookies
    - listitem:
      - link "Accessibility":
        - /url: /accessibility
  - separator
  - link "Facebook":
    - /url: https://facebook.com
    - img
  - link "Twitter":
    - /url: https://twitter.com
    - img
  - link "Instagram":
    - /url: https://instagram.com
    - img
  - link "YouTube":
    - /url: https://youtube.com
    - img
  - text: Visa Mastercard Amex Apple Pay
  - paragraph: © 2026 FureIn. Crafted withfor living comfortably.
- region "Notifications alt+T"
- alert: Shop Storefront Catalog | FureIn
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('guest checkout flow', async ({ page }) => {
  4  |   // 1. Visit homepage
  5  |   await page.goto('/');
  6  |   await expect(page).toHaveTitle(/FureIn/);
  7  | 
  8  |   // 2. Add first product to cart
  9  |   // Using the first 'Add' button found in the trending section
  10 |   const addButton = page.getByRole('button', { name: 'Add' }).first();
  11 |   await addButton.click();
  12 |   
  13 |   // Wait for toast or local state update
  14 |   await page.waitForTimeout(1000);
  15 | 
  16 |   // 3. Navigate to cart
  17 |   await page.goto('/cart');
  18 |   const cartTitle = page.getByRole('heading', { name: /Architecture \/ Cart/i });
  19 |   await expect(cartTitle).toBeVisible();
  20 | 
  21 |   // 4. Proceed to checkout
  22 |   const checkoutLink = page.getByRole('link', { name: /Proceed to Secure Checkout/i });
  23 |   // If it's not a link but a button inside a link, or we just navigate
  24 |   await page.goto('/checkout'); 
  25 | 
  26 |   // 5. Fill shipping information
  27 |   await page.fill('input[placeholder="John"]', 'Guest');
  28 |   await page.fill('input[placeholder="Doe"]', 'User');
  29 |   await page.fill('input[type="email"]', 'guest@example.com');
  30 |   await page.fill('input[placeholder="+1 (555) 000-0000"]', '1234567890');
  31 |   await page.fill('input[placeholder="123 Architectural Way"]', '456 Guest Lane');
  32 |   await page.fill('input[placeholder="New York"]', 'Guest City');
  33 |   await page.fill('input[placeholder="NY"]', 'GS');
  34 |   await page.fill('input[placeholder="10001"]', '54321');
  35 |   
  36 |   await page.click('button:has-text("Continue to Payment")');
  37 | 
  38 |   // 6. Complete payment
  39 |   // Wait for payment step to load and stabilize
  40 |   await expect(page.getByText(/Payment Method/i)).toBeVisible({ timeout: 15000 });
  41 |   
  42 |   // Click 'Pay' button (contains total)
  43 |   const payButton = page.getByRole('button', { name: /Pay \$/i });
  44 |   await payButton.click();
  45 | 
  46 |   // 7. Verify success
> 47 |   await expect(page.getByText(/Acquisition Successful/i)).toBeVisible({ timeout: 20000 });
     |                                                           ^ Error: expect(locator).toBeVisible() failed
  48 |   await expect(page.getByText(/Our curators are now preparing your collection/i)).toBeVisible();
  49 | });
  50 | 
```