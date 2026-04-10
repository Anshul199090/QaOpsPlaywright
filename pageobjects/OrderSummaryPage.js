export class OrderSummaryPage{
    constructor(page){
        this.page = page;
        this.orderSummary = page.locator(".col-text");
    }

    async getOrderSummary(){
        return await this.orderSummary.textContent();
    }
}