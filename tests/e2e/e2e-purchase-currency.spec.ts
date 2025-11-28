import {expect, test} from "@playwright/test";
import {HomePage} from "../../page-objects/HomePage";
import {LoginPage} from "../../page-objects/LoginPage";
import {PurchaseForeignCurrency} from "../../page-objects/PurchaseForeignCurrency";

test.describe("Purchase Currency", async () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let purchaseTab: PurchaseForeignCurrency;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        purchaseTab = new PurchaseForeignCurrency(page);

        await homePage.gotoHomePage();
        await homePage.clickSignIn();
        await loginPage.login("username", "password");
        await purchaseTab.goToTargetURL();
    })

    test("Canada dollar purchase", async () => {
        await purchaseTab.inputFills("CAD", "500");
        await purchaseTab.radioAndCalculateClick(1);
        await purchaseTab.checkMessages();
        await purchaseTab.clickPurchase();
    })
})