import {Page, Locator, expect} from "@playwright/test";

export class SearchPage {
    readonly page!: Page;
    readonly numberOfResults!: Locator;

    constructor(page: Page) {
        this.page = page;
        this.numberOfResults = page.locator("li > a");
    }

    async assertCountElements(count: number){
        await expect(this.numberOfResults).toHaveCount(count);

    }
}