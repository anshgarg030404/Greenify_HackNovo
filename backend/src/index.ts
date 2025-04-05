import express from "express";
import { userRouter } from "./router/user";
import cors from "cors"
import { productRouter } from "./router/products";
import { assessmentRouter } from "./router/assessment";
import { installationRouter } from "./router/installation";
import { progressRouter } from "./router/progress";

const app = express()
app.use(express.json());

app.use(cors())

app.use("/api/v1/user" , userRouter);
app.use("/api/v1/products" , productRouter);
app.use("/api/v1/assessment" , assessmentRouter);
app.use("/api/v1/installation", installationRouter);
app.use("/api/v1/progress", progressRouter);


app.listen(3000)