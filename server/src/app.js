const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const corsMiddleware = require("./shared/middlewares/cors.middleware");
const helmet = require("helmet");
const errorHandler = require("./shared/middlewares/errorHandler");

//* Routes Import
const authRouter = require("./features/v1/auth/auth.routes");
const userRouter = require("./features/v1/users/user.routes");
const postRouter = require("./features/v1/posts/post.routes");

const app = express();

//* Security
app.use(helmet());
app.use(corsMiddleware);

//* Parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//* Log
app.use(morgan("dev"));

//* Static Routes
app.use("/", express.static(path.join(__dirname, "..", "public")));

//* Routes
app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);
app.use("/v1/post", postRouter);

//* 404 Handler
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Path Not Found! Please Check Path/Method",
  });
});

//* Error Handler
app.use(errorHandler);

module.exports = app;
