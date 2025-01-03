import express from "express";
import { userRouter } from "./routes/userRouter";
import { productRouter } from "./routes/productsRouter";
import { orderRouter } from "./routes/pedidosRouter";

const app = express();
app.use(express.json());

app.use(userRouter)
app.use(productRouter)
app.use(orderRouter)
app.get("/", (_req, res) => {
    res.send("Bienvenido a la tienda online!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

export const appServer = app

