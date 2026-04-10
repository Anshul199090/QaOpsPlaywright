import { Page, Locator } from '@playwright/test'

export class OrdersreviewPage {

    page: Page;
    thankYouText: Locator;
    orderId: Locator;
    myOrders: Locator;

    constructor(page: Page) {
        this.page = page;
        this.thankYouText = page.locator("h1");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrders = page.locator("button[routerlink='/dashboard/myorders']");
    }

    async getThankYouText() {
        return await this.thankYouText.textContent();
    }

    async getOrderId() {
        return await this.orderId.textContent();
    }

    async goToMyOrdersPage() {
        await this.myOrders.click();
    }
}
