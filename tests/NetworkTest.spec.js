import { test, expect, request } from '@playwright/test'
const { APiUtils } = require('../utils/APiUtils')
const requestPayload = { userEmail: "anshul.bedi10001100@gmail.com", userPassword: "Sheaffer@11" };
const ordersPayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
const fakePayloadData = { "data": [], "message": "No Orders" };


let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, requestPayload);
    response = await apiUtils.createOrder(ordersPayload);
});



test.only('Place the order', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator(".card-body b").first().waitFor();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69689148c941646b7a9a5c7c", async route => {

        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayloadData);
        route.fulfill(
            {
                response,
                body
            }
        )
    });
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69689148c941646b7a9a5c7c");
    console.log(await page.locator(".mt-4").textContent());

});

