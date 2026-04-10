import { test, expect } from '@playwright/test'
import { POManager } from '../pageobjects_ts/POManager'
import dataSet from '../utils_ts/placeorderTestData.json' assert { type: 'json' };
import dataSet1 from '../utils_ts/placeorderTestData1.json' assert { type: 'json' };

/*1. "parallel" to run all the tests in parallel
  2. "serial" in case the tests are interdependent then if one test fail following tests will not run
*/
test.describe.configure({mode: 'serial'})

for (const data of dataSet) {
    test(`@WebTs Client app end 2 end for ${data.prodName}`, async ({ page }) => {
        //const context = await browser.newContext();
        //const page = await context.newPage();

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const mycartPage = poManager.getMycartPage();
        const paymentPage = poManager.getPaymentPage();
        const ordersreviewPage = poManager.getOrdersreviewPage();
        const orderhistoryPage = poManager.getOrdershistoryPage();
        const ordersummaryPage = poManager.getOrderSummaryPage();

        await loginPage.goToUrl();
        await loginPage.validLogin(data.userName, data.password);
        await dashboardPage.searchProduct(data.prodName);
        await dashboardPage.navigateToCart();
        const visibility = await mycartPage.prodVisibleOnMyCart(data.prodName);
        expect(visibility).toBeTruthy();
        await mycartPage.goToCheckoutPage();
        await paymentPage.fillPaymentDetails();
        const actualName = await paymentPage.getUserNameText();
        expect(actualName).toBe(data.userName);
        await paymentPage.placeOrder();
        const actualThankuText = await ordersreviewPage.getThankYouText();
        expect(actualThankuText).toBe(" Thankyou for the order. ");
        let orderId: any;
        orderId = await ordersreviewPage.getOrderId();
        console.log(orderId);
        await ordersreviewPage.goToMyOrdersPage();
        await orderhistoryPage.viewOrder(orderId);
        const orderIdDetails = await ordersummaryPage.getOrderSummary();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();

        //await page.pause();
    });
}

for (const data of dataSet1) {
test(`@UITs Client app end 2 end for new ${data.prodName}`, async ({ page }) => {
    //const context = await browser.newContext();
    //const page = await context.newPage();

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const mycartPage = poManager.getMycartPage();
    const paymentPage = poManager.getPaymentPage();
    const ordersreviewPage = poManager.getOrdersreviewPage();
    const orderhistoryPage = poManager.getOrdershistoryPage();
    const ordersummaryPage = poManager.getOrderSummaryPage();

    await loginPage.goToUrl();
    await loginPage.validLogin(data.userName, data.password);
    await dashboardPage.searchProduct(data.prodName);
    await dashboardPage.navigateToCart();
    const visibility = await mycartPage.prodVisibleOnMyCart(data.prodName);
    expect(visibility).toBeTruthy();
    await mycartPage.goToCheckoutPage();
    await paymentPage.fillPaymentDetails();
    const actualName = await paymentPage.getUserNameText();
    expect(actualName).toBe(data.userName);
    await paymentPage.placeOrder();
    const actualThankuText = await ordersreviewPage.getThankYouText();
    expect(actualThankuText).toBe(" Thankyou for the order. ");
    let orderId: any;
    orderId = await ordersreviewPage.getOrderId();
    console.log(orderId);
    await ordersreviewPage.goToMyOrdersPage();
    await orderhistoryPage.viewOrder(orderId);
    const orderIdDetails = await ordersummaryPage.getOrderSummary();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    //await page.pause();
});
}
