import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import notFound from "./middlewares/notFound.js";
import { authRoutes } from "./modules/auth/auth.route.js";
import { jobRoutes } from "./modules/job/job.route.js";
import { paymentRoutes } from "./modules/payment/payment.route.js";
import { paymentController } from "./modules/payment/payment.controller.js";

const app = express();

app.post("/api/v1/payment/webhook", express.raw({ type: "application/json" }), paymentController.checkWebhook);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world! Server is working.");
});

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

app.use(cookieParser());


// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/payment", paymentRoutes);



app.use(globalErrorHandler)
app.use(notFound)

export default app;