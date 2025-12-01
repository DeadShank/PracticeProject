import {expect, test} from "@playwright/test";
import {HomePage} from "../../page-objects/HomePage";
import {LoginPage} from "../../page-objects/LoginPage";
import {PurchaseForeignCurrencyPage} from "../../page-objects/PurchaseForeignCurrencyPage";
import {accountData} from "../fixtures/account";

test.describe("Purchase Currency", async () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let purchaseTab: PurchaseForeignCurrencyPage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        purchaseTab = new PurchaseForeignCurrencyPage(page);

        await homePage.gotoHomePage();
        await homePage.clickSignIn();
        await loginPage.login(accountData.username, accountData.password);
        await purchaseTab.goToTargetURL();
    })

    test("Canada dollar purchase", async () => {
        await purchaseTab.inputFills("CAD", "500");
        await purchaseTab.radioAndCalculateClick(1);
        await purchaseTab.checkMessages();
        await purchaseTab.clickPurchase();
    })
})