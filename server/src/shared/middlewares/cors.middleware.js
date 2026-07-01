const cors = require("cors");

const allowedOrigin = process.env.AllowedOrigin;

const corsMiddleware = cors({
  origin: (origin, callBack) => {
    if (!origin || allowedOrigin.includes(origin)) {
      callBack(null, allowedOrigin);
    } else {
      callBack(
        new Error(`CORS: Request is Not Allowed From This Origin ${origin}`),
      );
    }
  },
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

module.exports = corsMiddleware;
