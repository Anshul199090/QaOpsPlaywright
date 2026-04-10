import { Page, Locator } from "@playwright/test";

export class LoginPage {

    page: Page;
    userName: Locator;
    password: Locator;
    signInBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator("[type='email']");
        this.password = page.locator("#userPassword");
        this.signInBtn = page.locator("#login");
    }

    async goToUrl() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(userName: string, password: string) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInBtn.click();
    }
}