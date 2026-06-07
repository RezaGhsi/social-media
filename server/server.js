require("dotenv").config({ quiet: true });
const app = require("./src/app");
const { connectDB } = require("./src/shared/config/db");

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT || "5000", () => {
    console.log("Server is Running on Port", PORT);
  });
});
