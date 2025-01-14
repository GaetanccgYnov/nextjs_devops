import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    // Va sur la page de login avant chaque test
    await page.goto("/login");
  });

  test("should display the login form", async ({ page }) => {
    // Vérifie que le formulaire de login est affiché
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test("should allow user to login with correct credentials", async ({
    page,
  }) => {
      await page.getByPlaceholder('Enter your email address').click();
      await page.getByPlaceholder('Enter your email address').fill('user@nextmail.com');
      await page.getByPlaceholder('Enter your email address').press('Tab');
      await page.getByPlaceholder('Enter password').fill('123456');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('link', { name: 'Home' }).click();
      await page.getByRole('link', { name: 'Invoices' }).click();
      await page.getByRole('link', { name: 'Customers' }).click();
      await page.getByRole('button', { name: 'Sign Out' }).click();
  });

  test("should show error message for invalid login", async ({ page }) => {
    // Tente de se connecter avec des informations incorrectes
    await page.fill('input[name="email"]', "invalid@example.com");
    await page.fill('input[name="password"]', "wrongpassword");

    // Clic sur le bouton "Log in"
    await page.click('button:has-text("Log in")');

    // Vérifie qu'un message d'erreur est affiché
    const errorMessage = page.locator("p.text-red-500"); // Sélectionne l'élément <p> contenant le message
    await expect(errorMessage).toBeVisible();

    // Vérifie le texte du message d'erreur (par exemple, "Invalid credentials" ou autre)
    await expect(errorMessage).toHaveText("Something went wrong.");
  });
});
