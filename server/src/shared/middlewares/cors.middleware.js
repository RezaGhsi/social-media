const cors = require("cors");

const allowedOrigins = process.env.AllowedOrigins;

const corsMiddleware = cors({
  origin: (origin, callBack) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callBack(null, true);
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
