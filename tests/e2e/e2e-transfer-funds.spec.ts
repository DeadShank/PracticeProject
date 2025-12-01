import {test} from "@playwright/test";
import {HomePage} from "../../page-objects/HomePage";
import {LoginPage} from "../../page-objects/LoginPage";
import {accountData} from "../fixtures/account";
import {TransferFundsPage} from "../../page-objects/TransferFundsPage";

test.describe("Transfer funds and Make Payments", async () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let transferPage: TransferFundsPage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        transferPage = new TransferFundsPage(page);

        await homePage.gotoHomePage();
        await homePage.clickSignIn();
        await loginPage.login(accountData.username, accountData.password)
        await transferPage.gotoTargetURL();

    })

    test("Transfer Funds", async ({page}) => {
        await transferPage.inputFills("1","6","500", "Test transfer");
        await transferPage.submitAndExpect();

    })
})