import {expect, Locator, Page} from "@playwright/test";
import {NavbarTabs} from "../../tests/fixtures/navbarTabs";

export class Navbar {
    private readonly page!: Page;
    private readonly tabs!: Record<NavbarTabs, Locator>;

    constructor(page: Page) {
        this.page = page;
        this.tabs = {
            [NavbarTabs.Summary]: page.locator("#account_summary_tab"),
            [NavbarTabs.Activity]: page.locator("#account_activity_tab"),
            [NavbarTabs.Transfer]: page.locator("#transfer_funds_tab"),
            [NavbarTabs.PayBills]: page.locator("#pay_bills_tab"),
            [NavbarTabs.MoneyMap]: page.locator("#money_map_tab"),
            [NavbarTabs.Statements]: page.locator("#online_statements_tab"),
        }
    }

    async clickTab(tab: NavbarTabs) {
        await this.tabs[tab].click();
    }

}