export class OrdershistoryPage {

    constructor(page) {
        this.page = page;
        this.rows = page.locator("tbody tr");

    }

    async viewOrder(orderId) {
        await this.rows.first().waitFor();
        const rowCount = await this.rows.count();

        for (let i = 0; i < rowCount; i++) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }
}