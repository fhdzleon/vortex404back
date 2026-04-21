import express from "express";
import cors from "cors";
import { appRouter } from "./router/index.js";
import { errorHandler } from "./lib/shared/middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./lib/swagger.js";

export const app = express();

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(appRouter);
app.use(errorHandler);
