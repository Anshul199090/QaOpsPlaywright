import { Locator, Page } from '@playwright/test'

export class MycartPage {

    page: Page;
    pageVisibleLocator: Locator;
    checkout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageVisibleLocator = page.locator("div li");
        //this.prodTitle = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkout = page.locator("text=checkout");
    }

    async prodVisibleOnMyCart(prodName: string) {
        await this.pageVisibleLocator.first().waitFor();
        const prodLocator = this.page.getByRole('heading', { name: prodName });
        const bool = await prodLocator.isVisible();
        return bool;

    }
    async goToCheckoutPage() {
        await this.checkout.click();
    }
}