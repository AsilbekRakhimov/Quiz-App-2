import express from "express";
import bodyParser from "body-parser";
import { appConfig } from "./config/app.config.js";
import { mongo } from "./db/mongo.js";
import { ErrorHandlerMiddleware } from "./middlewares/error-handler.middleware.js";
import router from "./routes/index.routes.js";

const app = express();

// ushlanmagan xatolar bilan ishlash
process.on("uncaughtException", (err) => {
  process.exit(1);
});

// promiselar bilan bog'liq xatoliklar
process.on("unhandledRejection", (reason, promise) => {
  process.exit(1);
});

// JSON tipidagi ma'lumotlarni parse qilish
app.use(bodyParser.json());

// URL-encoded tipidagi ma'lumotlarni parse qilish
app.use(bodyParser.urlencoded({ extended: true }));


// mongo databaseni ulash
await mongo();


// main endpoint
app.use("/api/v1", router);

// xato urlga so'rov
app.all("*", (_, res) => {
  res.status(404).send({
    message: "Url is not found",
  });
});


// xatoliklarni ushlash
app.use(ErrorHandlerMiddleware);

// serverni ishga tushirish
app.listen(appConfig.port, appConfig.host, () => {
  console.log(`Server is running on port: ${appConfig.port}`);
});
