import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { ApplicationError } from "./src/error-handlers/errorhandler.js";
import productRouter from "./src/features/product/product.routes.js";
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" assert { type: "json" };

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

app.use("/api/products", productRouter);

app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);
  }
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).send(err.message);
  }

  console.log(err);
  res.status(500).send("Something Went Wrong! Please try again later");
});
app.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found!Please check our documentation for more information at http://localhost:9001/api-docs "
    );
});
export default app;
