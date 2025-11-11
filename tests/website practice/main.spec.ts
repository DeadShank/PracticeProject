import {loadHomepageCoinMarket} from "../../helpers";
import {expect, test} from "@playwright/test";

test.describe("Top panel element exist", async () => {
    test("category: Top", async ({page}) => {
        await loadHomepageCoinMarket(page);
        const element = page.locator('span[title="Top"]').first();
        await expect(element).toHaveText('Top');
    })
    test("category: Trending", async ({page}) => {
        await loadHomepageCoinMarket(page);
        await expect(page.locator('span[title="Trending"]').first()).toHaveText("Trending");
    })
    test("category: Most Visited",async ({page}) => {
        await loadHomepageCoinMarket(page);
        await expect(page.locator('span[title="Most Visited"]').first()).toHaveText("Most Visited");
    })

})