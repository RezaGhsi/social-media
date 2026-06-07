const cors = require("cors");

const allowedOrigins = process.env.AlloedOrigins;

const corsMiddleware = cors({
  origin: (origin, callBack) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callBack(null, true);
    } else {
      callBack(new Error("CORS: این origin مجاز نیست"));
    }
  },
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

module.exports = corsMiddleware;
