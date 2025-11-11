import {test, expect} from '@playwright/test'
import {loadHomepage, assertTitle} from "../helpers";


test.describe("My first test suite", (): void => {
    test("Simple basic test", async ({page}) => {
        await page.goto("http://www.example.com")
        const pageTitle = await page.locator("h1");
        await expect(pageTitle).toContainText("Example Domain");
    })

    test("Click on Elements", async ({page}) => {
        await page.goto("http://zero.webappsecurity.com");
        await page.click("#signin_button");
        await page.click("text=Sign in")
        const errorMessage = await page.locator(".alert-error");
        await expect(errorMessage).toContainText("Login and/or password are wrong.")

    })

    test("Click on Forgot Password", async ({page}) => {
        await page.goto("http://zero.webappsecurity.com/login.html?login_error=true");
        await page.click("text=Forgot your password ?")
        await page.getByRole("button", {name: "Send Password"}).click()
        const proveText = await page.locator("text=Your password will be sent to the following email:")
        await expect(proveText).toContainText(`Your password will be sent to the following email:`)
    })

    test.skip("Selectors", async ({page}) => {
        //text
        await page.click("text=some text")

        //css selectors
        await page.click("button")
        await page.click("#id");
        await page.click(".class")

        //Only visible Css selectors
        await page.click(".submit-button:visible")

        //combinations
        await page.click("#username .first")

        //Xpath
        await page.click("//button")
    })

    test("Working with Inputs", async ({page}) => {
        await page.goto("http://zero.webappsecurity.com/index.html");
        await page.click(".icon-signin")
        await page.fill("#user_login", "devil@gmail.com")
        await page.fill("#user_password", "123456")
        await page.click("#user_remember_me")
        await page.click(".btn-primary")
        const errorMessage = await page.locator(".alert-error");
        await expect(errorMessage).toContainText("Login and/or password are wrong.")
    })

    test("Assertions @myTag", async ({page}) => {
        await page.goto("http://www.example.com");
        await expect(page).toHaveURL("http://www.example.com")
        await expect(page).toHaveTitle("Example Domain");

        const element = await page.locator("h1")
        await expect(element).toBeVisible();
        await expect(element).toContainText("Example Domain");
        await expect(element).toHaveCount(1)

        const nonExistElement = await page.locator("h5");
        await expect(nonExistElement).not.toBeVisible()
    })
})

test.describe.skip("Hooks",() => {
    test.beforeEach(async ({page}) => {
        await page.goto("http://www.example.com");
    })

    test("Screenshot", async ({page}) => {
        await page.screenshot({path: "screenshot.png", fullPage: true});
    })

    test("Single element Screenshot", async ({page}) => {
        const element = await page.$("h1");
        await element?.screenshot({path: 'single_element_screenshot.png'});
    })
})

test.only("Custom helpers", async ({page}) => {
    await loadHomepage(page)
    await page.pause();
    await assertTitle(page)
})