import type { NextFunction, Request, Response } from "express";
export declare const paymentController: {
    createPaymentIntent: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    checkWebhook: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTotalRevenue: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=payment.controller.d.ts.map