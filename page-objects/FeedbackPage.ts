import {Page, Locator, expect} from "@playwright/test";

export class FeedbackPage {
    readonly page!: Page;
    private readonly nameInput!: Locator;
    private readonly emailInput!: Locator;
    private readonly subjectInput!: Locator;
    private readonly commentInput!: Locator;
    private readonly clearButton!: Locator;
    private readonly submitButton!: Locator;
    private readonly headerMessage!: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator("#name");
        this.emailInput = page.locator("#email");
        this.subjectInput = page.locator("#subject");
        this.commentInput = page.locator("#comment");
        this.clearButton = page.locator("input[name='clear']");
        this.submitButton = page.locator(".btn-primary");
        this.headerMessage = page.locator(".span6");
    }

    async formFill(name: string, email: string, subject: string, comment: string){
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.commentInput.fill(comment);
    }

    async clearAndCheckFills(){
        await this.clearButton.click();
        await expect(this.nameInput).toBeEmpty();
        await expect(this.emailInput).toBeEmpty();
        await expect(this.subjectInput).toBeEmpty();
        await expect(this.commentInput).toBeEmpty();
    }
    async submitFeedback(){
        await this.submitButton.click();
    }

    async checkHeaderMessage(){
        await expect(this.headerMessage).toContainText("They will be reviewed by our Customer Service staff and given the full attention that they deserve.");
    }
}