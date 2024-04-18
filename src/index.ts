import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./router";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import fileUpload from "express-fileupload";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const swaggerDocument = YAML.load("./swagger.yaml");

app.use(cors());
app.use(express.json());
app.use(express.static("static"));
app.use(cookieParser());
app.use(fileUpload());
app.use("/api", router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Express + PostgresQL + Prisma Server running on port ${port}`);
});
