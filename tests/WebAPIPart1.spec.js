import {test, expect, request} from '@playwright/test'
const {APiUtils} = require('../utils/APiUtils')
const requestPayload = {userEmail: "anshul.bedi10001100@gmail.com", userPassword: "Sheaffer@11"};
const ordersPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};


let response;

test.beforeAll( async()=>{
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, requestPayload);
    response = await apiUtils.createOrder(ordersPayload);

   
});



test.only('Place the order', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink='/dashboard/myorders']").click();
    const rows = page.locator("tbody tr")
    await rows.first().waitFor();
    const rowCount = await rows.count();

    for(let i=0; i<rowCount; i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});

