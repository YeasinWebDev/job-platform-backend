import { paymentService } from "./payment.service.js";
import sendResponse from "../../shared/sendResponse.js";
import AppError from "../../helper/appError.js";
import { stripe } from "../../config/stripe.js";
const createPaymentIntent = async (req, res, next) => {
    if (!req.user)
        throw new Error("User not found");
    try {
        const result = await paymentService.createPaymentIntent(req.user.email, req.body.amount, req.body.jobId);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Payment intent created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const checkWebhook = async (req, res, next) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    }
    catch (error) {
        throw new AppError("Webhook Error", 400);
    }
    const result = await paymentService.checkWebhook(event);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Payment created successfully",
        data: result,
    });
};
const getTotalRevenue = async (req, res, next) => {
    try {
        const result = await paymentService.getTotalRevenue();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Total revenue fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const paymentController = { createPaymentIntent, checkWebhook, getTotalRevenue };
//# sourceMappingURL=payment.controller.js.map