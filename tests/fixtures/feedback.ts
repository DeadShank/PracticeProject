export interface FeedbackType {
    name: string;
    email: string;
    subject: string;
    comment: string;
}

export const feedbackData: FeedbackType = {
    name: "some name",
    email: "some email@gmail.com",
    subject: "some subject",
    comment: "some comment"
};