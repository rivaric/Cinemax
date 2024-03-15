import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Express + PostgresQL + Prisma Server running on port ${port}`);
});
