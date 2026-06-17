const jwt = require("jsonwebtoken");

const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
const refreshTokenExpire = process.env.JWT_REFRESH_EXPIRE;

const refreshTokenGen = (id) => {
  const token = jwt.sign({ id: id.toString() }, refreshTokenSecret, {
    expiresIn: `${refreshTokenExpire}d`,
  });
  return `Bearer ${token}`;
};

module.exports = refreshTokenGen;
