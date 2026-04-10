import {test, expect} from '@playwright/test'

test("Popup validations", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    /*await page.goto("http://google.com");
    await page.goBack();
    await page.goForward();*/
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.getByRole("button", {name: 'Hide'}).click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
    page.once("dialog", dialog => dialog.accept());
    await page.getByRole("button", {name: 'Confirm'}).click();
    page.once("dialog", dialog => dialog.dismiss());
    await page.getByRole("button", {name: 'Confirm'}).click();
    await page.locator("#mousehover").hover();
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href='lifetime-access']:visible").click();
    const message = await framePage.locator(".text h2").textContent();
    console.log(message.split(" ")[1]);
    await page.pause();
});

test("Screenshot & visual comparison", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.getByPlaceholder("Hide/Show Example").screenshot({path: 'partialScreenshot.png'})
    await page.getByRole("button", {name: 'Hide'}).click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
    
});

test.only('visual testing', async({page})=>{
    await page.goto("https://google.com/")
    expect(await page.screenshot()).toMatchSnapshot('landing.png')
});