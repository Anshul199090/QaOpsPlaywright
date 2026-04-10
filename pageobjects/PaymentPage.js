export class PaymentPage {

    constructor(page) {
        this.page = page;
        this.selectCountry = page.locator("[placeholder='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.userNameLabel = page.locator(".user__name label");
        this.placeOrderBtn = page.locator(".action__submit");
    }

    async fillPaymentDetails() {
        await this.selectCountry.pressSequentially("Ind", { delay: 150 });
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text.trim() === "India") {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async getUserNameText() {
        return await this.userNameLabel.textContent();
    }

    async placeOrder() {
        await this.placeOrderBtn.click();
    }
}
