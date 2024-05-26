import { test, expect } from "@playwright/test";

test("Displays the landing page correctly and triggers rollback on failure", async ({
  page,
  baseURL,
}) => {
  // Navigate to the home page
  await page.goto(`${baseURL}`);

  // Intentionally fail the test by expecting a non-existent element
  await expect(page.getByText("NonExistentElement")).toBeVisible(); // This will intentionally fail the test

  // If the test reaches this point, the intentional failure did not occur
  // This line should not be reached if the test fails as expected
  console.log("This line should not be reached if the test fails as expected");
});
