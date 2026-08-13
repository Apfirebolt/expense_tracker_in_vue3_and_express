import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './server/config/swagger.js'
import { notFound, errorHandler } from "./server/middleware/errorMiddleware.js";
import connectDB from "./server/config/db.js";
import { connectProducer } from "./server/utils/kafkaConnect.js";

import authRoutes from "./server/routes/auth.js";
import expenseRoutes from "./server/routes/expense.js";
import exp from "constants";

dotenv.config();

connectDB();
connectProducer();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080",
  }),
);

// 👈 Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

let buildLocation = "client/build";

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);

export default app;
