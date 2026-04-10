import { Page, Locator } from '@playwright/test'

export class OrderSummaryPage {

    page: Page;
    orderSummary: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderSummary = page.locator(".col-text");
    }

    async getOrderSummary() {
        return await this.orderSummary.textContent();
    }
}