import type Stripe from "stripe";
export declare const paymentService: {
    createPaymentIntent: (email: string, amount: number, jobId: string) => Promise<{
        result: {
            id: string;
            status: import("@prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            jobId: string;
            stripeSessionId: string | null;
            amount: number;
            companyId: string;
        };
        paymentUrl: string | null;
    }>;
    checkWebhook: (event: Stripe.Event) => Promise<boolean>;
    getTotalRevenue: () => Promise<{
        totalRevenue: number | null;
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map