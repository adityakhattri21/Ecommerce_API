const express = require("express");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");

app.use("/api/v1",userRoutes);
app.use("/api/v1",productRoute);

app.use(errorMiddleware);
module.exports = app;
