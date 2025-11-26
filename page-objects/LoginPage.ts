import {expect, Locator, Page} from "@playwright/test";

export class LoginPage {
    private readonly page!: Page;
    private readonly usernameInput!: Locator;
    private readonly passwordInput!: Locator;
    private readonly submitButton!: Locator;
    private readonly errorMessage!: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("#user_login");
        this.passwordInput = page.locator("#user_password");
        this.submitButton = page.locator("text=Sign in");
        this.errorMessage = page.locator(".alert-error");
    }

    async visitAccount(){
        await this.page.goto("http://zero.webappsecurity.com/bank/account-summary.html");
    }

    async login(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async assertErrorMessage(){
        await expect(this.errorMessage).toContainText("Login and/or password are wrong.");
    }
}