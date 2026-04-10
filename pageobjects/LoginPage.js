export class LoginPage {

    constructor(page) {
        this.page = page;
        this.userName = page.locator("[type='email']");
        this.password = page.locator("#userPassword");
        this.signInBtn = page.locator("#login");
    }

    async goToUrl() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInBtn.click();
    }
}