import {expect, test} from "@playwright/test";
import {zeroWebPage} from "../../helpers";

test.describe("Purchase Currency", async () => {
    test.beforeEach(async ({page}) => {
        await zeroWebPage(page);
        await page.click("#signin_button");
        await page.fill("#user_login", "username");
        await page.fill("#user_password", "password");
        await page.click("text=Sign in");
        await page.goto("http://zero.webappsecurity.com/bank/pay-bills.html");
        await page.click("text=Purchase Foreign Currency");
    })

    test("Canada dollar purchase", async ({page}) => {
        await page.selectOption("#pc_currency","CAD");
        await expect(page.locator("#sp_sell_rate")).toBeVisible();
        await page.fill("#pc_amount", "500");
        await page.click("#pc_inDollars_true");
        await page.click("#pc_calculate_costs");
        await expect(page.locator("#pc_conversion_amount")).toBeVisible();
        await page.click("#purchase_cash");
        const alertMessage = await page.locator("#alert_content");
        await expect(alertMessage).toBeVisible();
        await expect(alertMessage).toContainText("Foreign currency cash was successfully purchased.");
    })
})