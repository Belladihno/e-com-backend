import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import connectDB from "./database/db.js";
import productRoute from "./routers/productRoute.js";
import AppError from "./utils/appError.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();
connectDB();

//security middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1/products", productRoute);

app.use((req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
