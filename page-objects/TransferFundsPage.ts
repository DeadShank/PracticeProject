import {Page, Locator, expect} from "@playwright/test";

export class TransferFundsPage{
    private readonly page!: Page;
    private readonly selectFromAccount!: Locator;
    private readonly selectToAccount!: Locator;
    private readonly inputAmount!: Locator;
    private readonly inputDescription!: Locator;
    private readonly submitButton!: Locator;
    private readonly boardHeader!: Locator;
    private readonly alertMessage!: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectFromAccount = page.locator("#tf_fromAccountId");
        this.selectToAccount = page.locator("#tf_toAccountId");
        this.inputAmount = page.locator("#tf_amount");
        this.inputDescription = page.locator("#tf_description");
        this.submitButton = page.locator("#btn_submit");
        this.boardHeader = page.locator(".board-header");
        this.alertMessage = page.locator(".alert-success")
    }

    async gotoTargetURL(){
        await this.page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
    }

    async inputFills(from: string, to: string, amount: string, description: string){
        await this.selectFromAccount.selectOption(from);
        await this.selectToAccount.selectOption(to);
        await this.inputAmount.fill(amount);
        await this.inputDescription.fill(description);
    }

    async submitAndExpect(){
        await this.submitButton.click();
        await expect(this.boardHeader).toContainText("Verify");
        await this.submitButton.click();
        await expect(this.alertMessage).toContainText("You successfully submitted your transaction.");
    }
}