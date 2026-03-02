import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

export default app;