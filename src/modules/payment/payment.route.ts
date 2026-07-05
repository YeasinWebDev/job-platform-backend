import { Router } from "express";
import { paymentController } from "./payment.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { Role } from "@prisma/client";

export const paymentRoutes = Router()

paymentRoutes.post("/create-payment-intent",checkAuth(Role.RECRUITER, Role.ADMIN), paymentController.createPaymentIntent);

paymentRoutes.get("/total-revenue",checkAuth(Role.ADMIN), paymentController.getTotalRevenue);