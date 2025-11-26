import {test, expect} from "@playwright/test";
import {LoginPage} from "../../page-objects/LoginPage";
import {HomePage} from "../../page-objects/HomePage";

test.describe("Login/Logout Flow", () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await homePage.gotoHomePage();
    })

    test("Negative Login Flow", async ({page}) => {
        await homePage.clickSignIn();
        await loginPage.login("invalid username", "invalid password");

        await loginPage.assertErrorMessage();
    })

    test.only("Positive login and logout", async ({page}) => {
        await homePage.clickSignIn();
        await loginPage.login("username", "password")
        await loginPage.visitAccount();

        const accountSummaryTab = await page.locator("#account_summary_tab")
        await expect(accountSummaryTab).toBeVisible()
        
        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})