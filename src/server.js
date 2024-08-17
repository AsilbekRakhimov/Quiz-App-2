import express from "express";
import { appConfig } from "./config/app.config.js";
import { mongo } from "./db/mongo.js";
import { ErrorHandlerMiddleware } from "./middlewares/error-handler.middleware.js";

const app = express();
app.use(express.json());
await mongo();

app.use(ErrorHandlerMiddleware);
app.all("*", (_, res) => {
    res.status(404).send({
        message:"Url is not found"
    })
})

app.listen(appConfig.port, appConfig.host, ()=>{
    console.log(`Server is running on port: ${appConfig.port}`);
})