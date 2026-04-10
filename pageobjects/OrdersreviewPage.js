export class OrdersreviewPage {

    constructor(page) {
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

    async goToMyOrdersPage(){
        await this.myOrders.click();
    }
}
