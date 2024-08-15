import express from "express";
import { appConfig } from "./config/app.config.js";

const app = express();
app.use(express.json());


app.listen(appConfig.port, appConfig.host, ()=>{
    console.log(`Server is running on port: ${appConfig.port}`);
})