import {test} from "@playwright/test";
import {HomePage} from "../../page-objects/HomePage";
import {SearchPage} from "../../page-objects/SearchPage";

test.describe("Search form", async () => {
    let homePage: HomePage;
    let searchPage: SearchPage;

    let bankSearch: string = "bank";
    let accountSearch: string = "Account";

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        searchPage = new SearchPage(page);

        await homePage.gotoHomePage();
    })

    test("Should find search results", async ({page}) => {
        await homePage.searchInputAndEnter(bankSearch)
        await searchPage.assertCountElements(2);

        await homePage.gotoHomePage();
        await homePage.searchInputAndEnter(accountSearch);
        await searchPage.assertCountElements(2);

    })

})