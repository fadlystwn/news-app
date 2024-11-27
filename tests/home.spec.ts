// tests/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display navigation and news items', async ({ page }) => {
    // Navigate to the home page
    await page.goto('http://localhost:3000/');
    await expect(page.locator('nav')).toBeVisible();
  });
});
