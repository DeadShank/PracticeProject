import {Page, Locator, expect} from "@playwright/test";

export class PurchaseForeignCurrency {
    private readonly page!: Page;
    private readonly purchaseTab!: Locator;
    private readonly currencySelect!: Locator;
    private readonly spellRateMessage!: Locator;
    private readonly inputAmount!: Locator;
    private readonly radioDollar!: Locator;
    private readonly radioCurrency!: Locator;
    private readonly calculateButton!: Locator;
    private readonly conversionText!: Locator;
    private readonly purchaseButton!: Locator;
    private readonly alertMessage!: Locator;
    constructor(page: Page) {
        this.page = page;
        this.purchaseTab = page.locator("text=Purchase Foreign Currency");
        this.currencySelect = page.locator("#pc_currency");
        this.spellRateMessage = page.locator("#sp_sell_rate");
        this.inputAmount = page.locator("#pc_amount");
        this.radioDollar = page.locator("#pc_inDollars_true");
        this.radioCurrency = page.locator("#pc_inDollars_false");
        this.calculateButton = page.locator("#pc_calculate_costs");
        this.conversionText = page.locator("#pc_conversion_amount")
        this.purchaseButton = page.locator("#purchase_cash");
        this.alertMessage = page.locator("#alert_content");
    }

    async goToTargetURL(){
        await this.page.goto("http://zero.webappsecurity.com/bank/pay-bills.html");
        await this.purchaseTab.click();
    }

    async inputFills(currency: string, amount: string){
        await this.currencySelect.selectOption(currency);
        await this.inputAmount.fill(amount);
    }
    async radioAndCalculateClick(typeRadio: number){
        if(typeRadio === 1){
            await this.radioDollar.click();
        } else if(typeRadio === 2) {
            await this.radioCurrency.click();
        }
        await this.calculateButton.click();
    }
    async checkMessages(){
        await expect(this.spellRateMessage).toBeVisible();
        await expect(this.conversionText).toBeVisible();
    }

    async clickPurchase(){
        await this.purchaseButton.click()
        await expect(this.alertMessage).toBeVisible();
        await expect(this.alertMessage).toContainText("Foreign currency cash was successfully purchased.");
    }
}