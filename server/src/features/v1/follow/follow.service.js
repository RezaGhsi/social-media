const followModel = require("./follow.model");
const userModel = require("./../users/user.model");
const AppError = require("../../../shared/utils/AppError");

exports.checkUserExits = async (username) => {
  const isUserExits = await userModel.exists({ username });
  if (!isUserExits) {
    throw new AppError("Page Not Found", 404);
  }
  return isUserExits;
};

exports.checkAlreadyFollowing = async (follower, following) => {
  const isAlreadyFollowing = await followModel.findOne({
    follower,
    following,
  });
  return isAlreadyFollowing;
};
