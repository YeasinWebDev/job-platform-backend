import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import notFound from "./middlewares/notFound.js";
import { authRoutes } from "./modules/auth/auth.route.js";

const app = express();

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



app.use(globalErrorHandler)
app.use(notFound)

export default app;