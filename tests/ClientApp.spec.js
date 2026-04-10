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
    await page.locator("[type='email']").fill(email);
    await page.locator("#userPassword").fill("Sheaffer@11");
    await page.locator("#login").click();
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    
    const count = await products.count();

    for(let i=0; i<count; i++){
        if(await products.nth(i).locator("b").textContent() === prodName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*=cart]").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy(); 
    
    await page.locator("text=checkout").click();
    await page.locator("[placeholder='Select Country']").pressSequentially("Ind", {delay: 150});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i<optionsCount; i++){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() === "India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name label")).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator("h1")).toHaveText(" Thankyou for the order. ");
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

