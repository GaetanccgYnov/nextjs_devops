import { users } from "@/app/lib/placeholder-data";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('Enter your email address').click();
  await page.getByPlaceholder('Enter your email address').fill(users[0].email);
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill(users[0].password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Customers' }).click();
  });

test.describe("Customers Page", () => {
  test("should display customer data correctly", async ({ page }) => {
    await page.getByRole('cell', { name: 'Amy Burns\'s profile picture' }).getByRole('paragraph').click();
    await page.getByRole('cell', { name: '$42.90' }).click();
    await page.getByRole('cell', { name: '$0.00' }).first().click();
    await page.getByRole('cell', { name: '2'}).first().click();
    await page.getByRole('cell', { name: 'Lee Robinson\'s profile' }).getByRole('paragraph').click();
    await page.getByRole('cell', { name: 'lee@robinson.com' }).click();
  });

  test("should filter customers based on search query", async ({ page }) => {
    await page.getByPlaceholder('Search customers...').click();
    await page.getByPlaceholder('Search customers...').fill('Amy');
    await page.getByPlaceholder('Search customers...').press('Enter');
    await page.getByRole('cell', { name: 'Amy Burns\'s profile picture' }).getByRole('paragraph').click();
    await page.getByRole('cell', { name: 'amy@burns.com' }).click();
    await page.getByRole('cell', { name: '2', exact: true }).first().click();
    await page.getByRole('cell', { name: '$0.00' }).first().click();
    await page.getByRole('cell', { name: '$42.90' }).click();
  });
});
