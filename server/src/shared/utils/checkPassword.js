const bcrypt = require("bcrypt");
const AppError = require("./AppError");

const checkPassword = (password, hashedPassword) => {
  if (!bcrypt.compareSync(password, hashedPassword)) {
    throw new AppError("Invalid Email/Username or Password", 401);
  }

  return true;
};

module.exports = checkPassword;
