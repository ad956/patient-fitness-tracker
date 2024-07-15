import { test, expect } from "@playwright/test";

test("test", async ({ baseURL, page }) => {
  await page.goto(`${baseURL}`);
  await page.getByRole("heading", { name: "Patient Fitness Tracker" }).click();
  await page
    .getByRole("heading", { name: "The New Era of Healthcare" })
    .click();
  await page.getByRole("button", { name: "Get Started" }).click();

  await page
    .locator("#services")
    .getByText("Services", { exact: true })
    .click();
  await page.getByText("We Cover A Big Variety Of").click();
  await page
    .locator("div")
    .filter({ hasText: "© 2024 Patient Fitness" })
    .nth(3)
    .click();

  await page.locator("footer").getByRole("img", { name: "brand-logo" }).click();
});
