import {test} from "@playwright/test";
import {HomePage} from "../../page-objects/HomePage";
import {PayBillsPage} from "../../page-objects/PayBillsPage";
import {LoginPage} from "../../page-objects/LoginPage";
import {accountData} from "../fixtures/account";
import {payeeValues, accountValues} from "../fixtures/pay-bills"

test.describe("Payment", async () => {
    let homePage: HomePage;
    let payBillsPage: PayBillsPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        payBillsPage = new PayBillsPage(page);
        loginPage = new LoginPage(page);

        await homePage.gotoHomePage();
        await homePage.clickSignIn()
        await loginPage.login(accountData.username, accountData.password);
        await payBillsPage.gotoPayBillsPage();
    })
    test("Sprint", async () => {
        await payBillsPage.inputFills(payeeValues.Sprint, accountValues.Brokerage, "5000", "2025-11-14", "sprint test");
        await payBillsPage.checkDetailsElement();
        await payBillsPage.clickPayButton();
        await payBillsPage.assertSuccessfullyMessage();
    })
})