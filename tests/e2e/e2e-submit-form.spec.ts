import {test, expect} from "@playwright/test";
import {feedbackData} from "../fixtures/feedback";
import {HomePage} from "../../page-objects/HomePage";
import {FeedbackPage} from "../../page-objects/FeedbackPage";

test.describe("Feedback Form", async () => {
    let homePage: HomePage;
    let feedbackPage: FeedbackPage;


    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        feedbackPage = new FeedbackPage(page);

        await homePage.gotoHomePage();
        await homePage.clickFeedback();
    })

    test("Feedback Form clear", async () => {
        await feedbackPage.formFill(feedbackData.name, feedbackData.email, feedbackData.subject, feedbackData.comment);
        await feedbackPage.clearAndCheckFills()
    })

    test("Feedback form submit", async () => {
        await feedbackPage.formFill(feedbackData.name, feedbackData.email, feedbackData.subject, feedbackData.comment);
        await feedbackPage.submitFeedback();
        await feedbackPage.checkHeaderMessage();
    })
})
