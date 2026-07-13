const AppError = require("../../../shared/utils/AppError");
const followModel = require("./follow.model");
const userModel = require("./../users/user.model");
const successResponse = require("../../../shared/utils/response");
const { checkUserExits, checkAlreadyFollowing } = require("./follow.service");

exports.followUser = async (req, res, next) => {
  try {
    const { username } = req.params;

    if (username === req.user.username) {
      throw new AppError("You Can't Follow Yourself");
    }

    const isUserExists = await checkUserExits(username);

    const isFollowing = await checkAlreadyFollowing(
      req.user.username,
      username,
    );
    if (isFollowing) {
      throw new AppError("You Already Follow This Page");
    }

    const follow = await followModel.create({
      follower: req.user.username,
      following: username,
    });

    return successResponse(res, 201, { message: `Now You Follow ${username}` });
  } catch (error) {
    next(error);
  }
};

exports.unFollowUser = async (req, res, next) => {
  try {
    const { username } = req.params;

    const isUserExists = await checkUserExits(username);

    const isFollowing = await checkAlreadyFollowing(
      req.user.username,
      username,
    );
    if (!isFollowing) {
      throw new AppError("You Don't Follow This Page");
    }

    await isFollowing.deleteOne();

    return successResponse(res, 201, {
      message: `Unfollowed ${username} Successfully`,
    });
  } catch (error) {
    next(error);
  }
};
