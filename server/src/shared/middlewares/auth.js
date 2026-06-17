const jwt = require("jsonwebtoken");

const AppError = require("./../utils/AppError");
const userModel = require("./../../features/v1/users/user.model");

const accessTokenSecret = process.env.JWT_ACCESS_SECRET;

exports.verifyToken = async (req, res, next) => {
  const [bearer, token] = req.cookie["access-token"]?.split(" ");

  try {
    if (!bearer || bearer !== "Bearer") {
      throw new AppError("Invalid Token", 401);
    }

    if (!token) {
      throw new AppError("No Token Provided Access Denied", 401);
    }

    const verify = jwt.verify(token, accessTokenSecret);

    const user = await userModel.findById(verify.id, "-password");
    if (!user) {
      throw new AppError("Invalid Token", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
