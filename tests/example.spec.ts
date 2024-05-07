import { test, expect } from "@playwright/test";

test("Displays the landing page correctly", async ({ page, baseURL }) => {
  // Navigate to the home page
  await page.goto(`${baseURL}`);

  // Expect the main heading to be visible
  await expect(
    page.getByText("The New Era of Healthcare Management")
  ).toBeVisible();
});
