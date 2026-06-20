const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.JWT_ACCESS_SECRET;

const accessTokenGen = (id) => {
  const token = jwt.sign({ id: id.toString() }, accessTokenSecret, {
    expiresIn: "1m",
  });
  return token;
};

module.exports = accessTokenGen;
