import { test, expect } from '@playwright/test';

test('homepage has title and hero section', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/FureIn/);

  // Check if the hero section heading is present
  const heroHeading = page.getByRole('heading', { level: 1 });
  await expect(heroHeading).toBeVisible();
});
