const express = require("express");
const cors = require("cors");
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
const followRouter = require("./features/v1/follow/follow.routes");
const likeRouter = require("./features/v1/like/like.routes");
const saveRouter = require("./features/v1/save/save.routes");

const app = express();

//* Security
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
if (process.env.NODE_ENV !== "production") {
  app.use(corsMiddleware);
}
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//* Parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//* Log
app.use(morgan("dev"));

//* Static Routes
app.use("/", express.static(path.join(__dirname, "..", "public")));

//* Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/follow", followRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/save", saveRouter);

//* 404 Handler
app.use("/api/*notfound", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Path Not Found! Please Check Path/Method",
  });
});

//* Error Handler
app.use(errorHandler);

//* Production Static Serve for Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get("/*frontend", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
  });
}

module.exports = app;
