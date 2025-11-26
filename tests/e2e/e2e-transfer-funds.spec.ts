import {expect, test} from "@playwright/test";
import {zeroWebPage} from "../../helpers";

test.describe("Transfer funds and Make Payments", async () => {
    test.beforeEach(async ({page}) => {
        await zeroWebPage(page)
        await page.click("#signin_button");
        await page.fill("#user_login", "username");
        await page.fill("#user_password", "password");
        await page.click("text=Sign in");
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');

    })

    test("Transfer Funds", async ({page}) => {
        await page.selectOption("#tf_fromAccountId", "1");
        await page.selectOption("#tf_toAccountId", "6");
        await page.fill("#tf_amount", "500");
        await page.fill("#tf_description", "Test transfer");
        await page.click(("#btn_submit"));
        const headerTitle = await page.locator(".board-header");
        await expect(headerTitle).toContainText("Verify");
        await page.click("#btn_submit");
        const successfullyTransaction = await page.locator(".alert-success");
        await expect(successfullyTransaction).toContainText("You successfully submitted your transaction.");
    })
})