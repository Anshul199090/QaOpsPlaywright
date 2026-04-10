import {test, expect} from '@playwright/test'

test.only('Client app registration and login', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const products = page.locator(".card-body")
    const prodName = "ZARA COAT 3";
    const email = "abedi19909090911@gmail.com";
    /*await page.locator(".text-reset").click();
    await page.locator("#firstName").fill("Anshul");
    await page.locator("#lastName").fill("Bedi");
    await page.locator("#userEmail").fill("abedi19909090911@gmail.com");
    await page.locator("#userMobile").fill("8375954608");
    await page.locator("#userPassword").fill("Sheaffer@11");
    await page.locator("#confirmPassword").fill("Sheaffer@11");
    await page.locator("[type='checkbox']").click();
    await page.locator("[value='Register']").click();
    await page.locator(".btn.btn-primary").click();*/
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Sheaffer@11");
    await page.getByRole("button", {name: 'Login'}).click();
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({hasText: 'ZARA COAT 3'}).getByRole("button", {name: 'Add To Cart'}).click();
    await page.getByRole("listitem").getByRole("button", {name: 'Cart'}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button", {name: 'Checkout'}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("Ind", {delay: 150});
    await page.getByRole("button", {name: 'India'}).nth(1).click();
    await page.getByText("Place Order").click();

    
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink='/dashboard/myorders']").click();
    const rows = page.locator("tbody tr")
    await rows.first().waitFor();
    const rowCount = await rows.count();

    for(let i=0; i<rowCount; i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    await page.pause();
});

