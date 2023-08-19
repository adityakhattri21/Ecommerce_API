const express = require("express");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");

app.use("/api/v1",userRoutes);

app.use(errorMiddleware);
module.exports = app;
