import {Page, Locator, expect} from "@playwright/test";
import {Navbar} from "./components/Navbar";
import {NavbarTabs} from "../tests/fixtures/navbarTabs";
import {AbstractPage} from "./AbstractPage";

export class PayBillsPage extends AbstractPage {
    private readonly navbar!: Navbar;

    private readonly payeeSelect!: Locator;
    private readonly accountSelect!: Locator;
    private readonly amountInput!: Locator;
    private readonly dateInput!: Locator;
    private readonly descriptionInput!: Locator;
    private readonly payButton!: Locator;
    private readonly detailsButton!: Locator;
    private readonly successfullyMessage!: Locator;

    private readonly payeeDetails: string = "#sp_payee_details";

    constructor(page: Page) {
        super(page);
        this.navbar = new Navbar(page);
        this.payeeSelect = page.locator("#sp_payee");
        this.accountSelect = page.locator("#sp_account");
        this.amountInput = page.locator("#sp_amount");
        this.dateInput = page.locator("#sp_date");
        this.descriptionInput = page.locator("#sp_description");
        this.payButton = page.locator("#pay_saved_payees");
        this.detailsButton = page.locator("#sp_get_payee_details");
        this.successfullyMessage = page.locator(".alert-success");
    }

    async gotoPayBillsPage() {
        await this.page.goto("http://zero.webappsecurity.com/bank/pay-bills.html");
        await this.navbar.clickTab(NavbarTabs.PayBills);
    }

    async inputFills(payee: string, account: string, amount: string, date: string, description: string) {
        await this.payeeSelect.selectOption(payee);
        await this.accountSelect.selectOption(account);
        await this.amountInput.fill(amount);
        await this.dateInput.fill(date);
        await this.descriptionInput.fill(description);
    }

    async checkDetailsElement() {
        await this.detailsButton.click();
        await this.page.waitForSelector(this.payeeDetails);
    }

    async assertSuccessfullyMessage(){
        await expect(this.successfullyMessage).toContainText("The payment was successfully submitted.");
    }

    async clickPayButton(){
        await this.payButton.click();
    }
}