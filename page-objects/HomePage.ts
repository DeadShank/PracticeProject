import {Keyboard, Locator, Page} from "@playwright/test";

export class HomePage {
    private readonly page!: Page;
    private readonly signInButton!: Locator;
    private searchInput!: Locator;
    private feedbackButton!: Locator;
    private pressEnter!: Keyboard;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator("#signin_button");
        this.searchInput = page.locator("#searchTerm");
        this.feedbackButton = page.locator("#feedback");
        this.pressEnter = page.keyboard;
    }

    async gotoHomePage(){
        await this.page.goto("http://zero.webappsecurity.com/");
    }
    async clickSignIn(){
        await this.signInButton.click();
    }

    async searchInputAndEnter(searchTerm: string){
        await this.searchInput.fill(searchTerm);
        await this.pressEnter.press("Enter");
    }

    async clickFeedback(){
        await this.feedbackButton.click();
    }
}