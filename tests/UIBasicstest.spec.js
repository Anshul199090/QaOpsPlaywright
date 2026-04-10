import { test, expect } from '@playwright/test'

test.only('Browser context playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.route("**/*.{jpg, png, jpeg}", route=>route.abort());

    const userName = page.locator("input#username");
    const signIn = page.locator("input#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshetty");
    await page.locator("[name='password']").fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.")
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.nth(0).textContent());
    console.log(await cardTitles.allInnerTexts());


});

test('Dropdown Controls', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    

    const userName = page.locator("input#username");
    const signIn = page.locator("input#signInBtn");
    const dropDown = page.locator("select.form-control");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await page.locator("[name='password']").fill("Learning@830$3mK2");
    await dropDown.selectOption("Consultant");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //await page.pause();
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class", "blinkingText");
});

test('Child window handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const docLink = page.locator("[href*='documents-request']");
    const userName = page.locator("input#username");

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            docLink.click()
        ]
    )

    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const arraytext = text.split("@");
    const domain = arraytext[1].split(" ")[0];
    console.log(domain);
    await userName.fill(domain);
    console.log(await userName.inputValue());
});
