import getBaseUrl from "@/app/utils/getBaseUrl";
import { test, expect } from "@playwright/test";

const BASE_URL = getBaseUrl();

test("Displays the landing page correctly", async ({ page }) => {
  // Navigate to the home page
  await page.goto(`${BASE_URL}/`);

  // Expect the main heading to be visible
  await expect(
    page.getByText("The New Era of Healthcare Management")
  ).toBeVisible();
});
