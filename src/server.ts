import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import prisma from "./config/prisma.js";


async function startServer() {
  try {
    await prisma.$connect();
    console.log("*** DB connection successful!!");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("*** Failed to start server", error);
    process.exit(1);
  }
}

startServer();

export default app;
