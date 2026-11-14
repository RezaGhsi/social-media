const userModel = require("./user.model");
const followModel = require("./../follow/follow.model");
const postModel = require("./../posts/post.model");
const likeModel = require("./../like/like.model");
const saveModel = require("./../save/save.model");
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

    const userProfile = await userModel
      .findOne({ username })
      .select("-role -password -refreshToken -email")
      .lean();

    // const [userProfile] = await userModel.aggregate([
    //   { $match: { username } },
    //   { $limit: 10 },
    //   {
    //     $lookup: {
    //       from: "posts",
    //       let: { userId: "$_id" },
    //       pipeline: [
    //         { $match: { $expr: { $eq: ["$$userId", "$user"] } } },
    //         { $sort: { createdAt: -1 } },
    //       ],
    //       as: "posts",
    //     },
    //   },
    // ]);

    if (!userProfile) throw new AppError("Page not Found", 404);

    const [followersCount, followingsCount, postsCount, isFollowing] =
      await Promise.all([
        followModel.countDocuments({
          following: userProfile.username,
        }),
        followModel.countDocuments({
          follower: userProfile.username,
        }),
        postModel.countDocuments({ user: userProfile._id }),
        isFollowingUser(req.user.username, userProfile.username),
      ]);

    Object.assign(userProfile, {
      followersCount,
      followingsCount,
      postsCount,
      isFollowing,
    });

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

exports.updateUserInfo = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length < 1) throw new AppError("Invalid Input");

    const updateFields = req.body;

    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { returnDocument: "after" },
    );

    successResponse(res, 200, {
      user,
      message: "Your Profile Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};
