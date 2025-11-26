import {expect, test} from "@playwright/test";
import {zeroWebPage} from "../../helpers";

test.describe("Account-activity", async () => {
    test.beforeEach(async ({page}) => {
        await zeroWebPage(page);
        await page.click("#signin_button");
        await page.fill("#user_login", "username");
        await page.fill("#user_password", "password");
        await page.click("text=Sign in");
        await page.goto("http://zero.webappsecurity.com/bank/account-activity.html");
    })

    test("Savings", async ({page}) => {
        await page.selectOption(".input-xlarge", "1");
        const trCounts = await page.locator("#all_transactions_for_account tbody tr");
        await expect(trCounts).toHaveCount(3);
    })

    test("Checking", async ({page}) => {
        await page.selectOption(".input-xlarge", "2");
        const trCounts = await page.locator("#all_transactions_for_account tbody tr");
        await expect(trCounts).toHaveCount(3);
    })

    test("Savings 3rd",async ({page}) => {
        await page.selectOption(".input-xlarge", "3");
        const trCounts = await page.locator("#all_transactions_for_account tbody tr");
        await expect(trCounts).toHaveCount(3);
    })

    test("Loan", async ({page}) => {
        await page.selectOption(".input-xlarge", "4");
        const trCounts = await page.locator("#all_transactions_for_account tbody tr");
        await expect(trCounts).toHaveCount(2);
    })

    test("Credit Card", async ({page}) => {
        await page.selectOption(".input-xlarge", "5");
        const trCounts = await page.locator("#all_transactions_for_account tbody tr");
        await expect(trCounts).toHaveCount(0);
    })

    test("Brokerage", async ({page}) => {
        await page.selectOption(".input-xlarge", "6");
        const trCounts = await page.locator("#all_transactions_for_account tbody tr");
        await expect(trCounts).toHaveCount(0);
    })
})