const express = require("express");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const orderRoute = require("./routes/orderRoutes");
const cartRoute = require("./routes/cartRoutes");

app.use("/api/v1",userRoutes);
app.use("/api/v1",productRoute);
app.use("/api/v1",orderRoute);
app.use("/api/v1",cartRoute);

app.use(errorMiddleware);
module.exports = app;
