const userModel = require("./user.model");
const followModel = require("./../follow/follow.model");
const AppError = require("../../../shared/utils/AppError");
const successResponse = require("../../../shared/utils/response");
const { removeOldAvatar, isFollowingUser } = require("./user.service");
const {
  getFollowingsList,
  getFollowersList,
} = require("../follow/follow.service");

exports.getUserPage = async (req, res, next) => {
  try {
    const { username } = req.params;

    // if (username === req.user.username) {
    //   return successResponse(res, 200, { user: req.user });
    // }

    const userProfile = await userModel
      .findOne({ username })
      .populate({ path: "posts", options: { sort: { createdAt: -1 } } })
      .select("-role -password -refreshToken")
      .lean();

    if (!userProfile) throw new AppError("Page not Found", 404);

    const followersCount = await followModel.countDocuments({
      following: userProfile.username,
    });
    const followingsCount = await followModel.countDocuments({
      follower: userProfile.username,
    });

    const isFollowing = await isFollowingUser(
      req.user.username,
      userProfile.username,
    );

    Object.assign(userProfile, {
      followersCount,
      followingsCount,
      isFollowing,
    });

    if (!isFollowing && userProfile.isPrivate) {
      userProfile.posts = undefined;
      throw new AppError("This Account is Private", 403, { user: userProfile });
    }

    return successResponse(res, 200, {
      user: userProfile,
    });
  } catch (error) {
    next(error);
  }
};

exports.userAvatarUpload = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError("No File Uploaded");

    const avatarUrl = `uploads/profiles/${req.file.filename}`;

    removeOldAvatar(req.user.avatarUrl);

    const user = await userModel
      .findByIdAndUpdate(
        req.user._id,
        { avatarUrl },
        { returnDocument: "after" },
      )
      .select("-password");

    successResponse(res, 201, { user, message: "Avatar Updated Successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getFollowings = async (req, res, next) => {
  try {
    const { username } = req.params;

    const followings = await getFollowingsList(req.user.username, username);

    successResponse(res, 200, { followings });
  } catch (error) {
    next(error);
  }
};

exports.getFollowers = async (req, res, next) => {
  try {
    const { username } = req.params;

    const followers = await getFollowersList(req.user.username, username);

    successResponse(res, 200, { followers });
  } catch (error) {
    next(error);
  }
};
