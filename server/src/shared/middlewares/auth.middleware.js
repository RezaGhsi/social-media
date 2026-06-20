const jwt = require("jsonwebtoken");

const AppError = require("../utils/AppError");
const userModel = require("../../features/v1/users/user.model");

const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.["access-token"];

    if (!token) {
      throw new AppError("No Token Provided Access Denied", 401);
    }

    const verify = jwt.verify(token, accessTokenSecret);

    const user = await userModel.findById(verify.id, "-password -refreshToken");
    if (!user) {
      throw new AppError("Invalid Token", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.verifyRefreshToken = async (req, res, next) => {
  const token = req.cookies?.["refresh-token"];
  try {
    if (!token) {
      throw new AppError("No Token Provided Access Denied", 401);
    }

    const payload = jwt.verify(token, refreshTokenSecret);

    const user = await userModel.findById(
      payload.id,
      "-password -refreshToken",
    );
    if (!user) {
      throw new AppError("Invalid Token", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Invalid Token",
    });
  }
};
