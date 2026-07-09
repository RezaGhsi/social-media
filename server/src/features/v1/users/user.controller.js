const userModel = require("./user.model");
const followModel = require("./../follow/follow.model");
const AppError = require("../../../shared/utils/AppError");
const successResponse = require("../../../shared/utils/response");
const { removeOldAvatar, isFollowingUser } = require("./user.service");

exports.getUserPage = async (req, res, next) => {
  try {
    const { username } = req.params;

    // if (username === req.user.username) {
    //   return successResponse(res, 200, { user: req.user });
    // }

    const userProfile = await userModel
      .findOne({ username })
      .populate("posts")
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

    const followings = await followModel
      .find({ follower: username })
      .select("following")
      .populate("followingUser", "username name avatarUrl")
      .limit(20)
      .lean();

    const followingList = [];
    followings.forEach((follow) => followingList.push(follow.followingUser[0]));

    successResponse(res, 200, { followings: followingList });
  } catch (error) {
    next(error);
  }
};

exports.getFollowers = async (req, res, next) => {
  try {
    const { username } = req.params;

    const followers = await followModel
      .find({ following: username })
      .select("follower")
      .populate("followerUser", "username name avatarUrl")
      .lean();

    const followerList = [];
    followers.forEach((follow) => followerList.push(follow.followerUser[0]));

    successResponse(res, 200, { followers: followerList });
  } catch (error) {
    next(error);
  }
};
