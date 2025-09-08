import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
console.log("origin", process.env.CORS_ORIGIN);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));
// app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log(`Incoming Request ${req.method} ${req.url}`);
//   next();
// });

import userRouter from "./src/router/user.route.js";
import productRouter from "./src/router/product.route.js";
import cartRouter from "./src/router/cart.route.js";

app.use("/user", userRouter);

app.use("/home", productRouter);

app.use("/product", cartRouter);

app.get("/", (req, res) => {
  res.send("Backend is running");
});
export default app;
