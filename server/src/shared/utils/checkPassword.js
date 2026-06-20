const bcryptjs = require("bcryptjs");
const AppError = require("./AppError");

const checkPassword = (password, hashedPassword) => {
  if (!bcryptjs.compareSync(password, hashedPassword)) {
    throw new AppError("Invalid Email/Username or Password", 401);
  }

  return true;
};

module.exports = checkPassword;
