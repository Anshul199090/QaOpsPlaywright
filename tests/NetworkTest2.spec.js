import { test, expect } from '@playwright/test'

test("Security test request intercept", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = "abedi19909090911@gmail.com";
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Sheaffer@11");
    await page.getByRole("button", { name: 'Login' }).click();
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    const rows = page.locator("tbody tr")
    await rows.first().waitFor();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69c667bcf86ba51a652ea854' }));

    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order")
    //await page.pause();
});