import type Stripe from "stripe";
import prisma from "../../config/prisma.js";
import { stripe } from "../../config/stripe.js";

const createPaymentIntent = async (email: string, amount: number, jobId: string) => {
  const isJobExist = await prisma.job.findUnique({ where: { id: jobId } });
  if (!isJobExist) {
    throw new Error("Job not found");
  }

  const result = await prisma.payment.create({
    data: {
      amount,
      jobId,
      companyId: isJobExist.recruiterId!, 
    },
  });

  const createPaymentIntent = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Payment for posting job ${isJobExist.title}`,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      paymentId: result.id,
    },
    success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}& jobId=${jobId}`,
    cancel_url: `${process.env.FRONTEND_URL}/payment/cancel?jobId=${jobId}`,
  });

  return { result, paymentUrl: createPaymentIntent.url };
};

const checkWebhook = async (event: Stripe.Event) => {
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const paymentid = session?.metadata?.paymentId;

    if (!paymentid) {
      throw new Error("Payment not found");
    }

    await prisma.payment.update({
      where: {
        id: paymentid,
      },
      data: {
        status: "SUCCESS",
      },
    });

    return true;
  }
  return false;
};

const getTotalRevenue = async () => {
  const result = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      status: "SUCCESS",
    },
  });
  return { totalRevenue: result._sum.amount };
};

export const paymentService = {
  createPaymentIntent,
  checkWebhook,
  getTotalRevenue
};
