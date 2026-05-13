import { test, expect } from '@playwright/test';

test('guest checkout flow', async ({ page }) => {
  // 1. Visit homepage
  await page.goto('/');
  await expect(page).toHaveTitle(/FureIn/);

  // 2. Add first product to cart
  // Using the first 'Add' button found in the trending section
  const addButton = page.getByRole('button', { name: 'Add' }).first();
  await addButton.click();
  
  // Wait for toast or local state update
  await page.waitForTimeout(1000);

  // 3. Navigate to cart
  await page.goto('/cart');
  const cartTitle = page.getByRole('heading', { name: /Architecture \/ Cart/i });
  await expect(cartTitle).toBeVisible();

  // 4. Proceed to checkout
  const checkoutLink = page.getByRole('link', { name: /Proceed to Secure Checkout/i });
  // If it's not a link but a button inside a link, or we just navigate
  await page.goto('/checkout'); 

  // 5. Fill shipping information
  await page.fill('input[placeholder="John"]', 'Guest');
  await page.fill('input[placeholder="Doe"]', 'User');
  await page.fill('input[type="email"]', 'guest@example.com');
  await page.fill('input[placeholder="+1 (555) 000-0000"]', '1234567890');
  await page.fill('input[placeholder="123 Architectural Way"]', '456 Guest Lane');
  await page.fill('input[placeholder="New York"]', 'Guest City');
  await page.fill('input[placeholder="NY"]', 'GS');
  await page.fill('input[placeholder="10001"]', '54321');
  
  await page.click('button:has-text("Continue to Payment")');

  // 6. Complete payment
  // Wait for payment step to load and stabilize
  await expect(page.getByText(/Payment Method/i)).toBeVisible({ timeout: 15000 });
  
  // Click 'Pay' button (contains total)
  const payButton = page.getByRole('button', { name: /Pay \$/i });
  await payButton.click();

  // 7. Verify success
  await expect(page.getByText(/Acquisition Successful/i)).toBeVisible({ timeout: 20000 });
  await expect(page.getByText(/Our curators are now preparing your collection/i)).toBeVisible();
});
