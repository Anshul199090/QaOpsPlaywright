import { Page, Locator } from '@playwright/test'

export class OrdershistoryPage {

    page: Page;
    rows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.rows = page.locator("tbody tr");

    }

    async viewOrder(orderId: string) {
        await this.rows.first().waitFor();
        const rowCount = await this.rows.count();

        for (let i = 0; i < rowCount; i++) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (rowOrderId && orderId.includes(rowOrderId.trim())) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }
}