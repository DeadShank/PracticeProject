import {test, expect} from "@playwright/test";
import {zeroWebPage} from "../../helpers";

test.describe("Payment", async ()=> {
    test.beforeEach(async ({page}) => {
        await zeroWebPage(page);
        await page.click("#signin_button");
        await page.fill("#user_login", "username");
        await page.fill("#user_password", "password");
        await page.click("text=Sign in");
        await page.goto("http://zero.webappsecurity.com/bank/pay-bills.html");
    })
    test("Sprint", async ({page}) => {
        await page.selectOption("#sp_payee", "sprint");
        await page.click("#sp_get_payee_details");
        await page.waitForSelector("#sp_payee_details");
        await page.selectOption("#sp_account", "6");
        await page.fill("#sp_amount", "5000");
        await page.fill("#sp_date", "2025-11-14");
        await page.fill("#sp_description", "test description");
        await page.click("#pay_saved_payees");
        await expect(page.locator("#alert_content")).toContainText("The payment was successfully submitted.")
    })
})