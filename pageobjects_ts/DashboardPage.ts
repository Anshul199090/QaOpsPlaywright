import { Page, Locator } from "@playwright/test";
//importing page and locator
export class DashboardPage {

    page: Page;
    products: Locator;
    productsText: Locator
    cart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*=cart]");
    }

    async searchProduct(prodName: string) {
        await this.productsText.first().waitFor();
        const titles = await this.products.allTextContents();
        console.log(titles);
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === prodName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
    }

}
