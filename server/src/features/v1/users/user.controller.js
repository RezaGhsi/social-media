const userModel = require("./user.model");
const followModel = require("./../follow/follow.model");
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
      .populate({
        path: "posts",
        options: { sort: { createdAt: -1 }, limit: 10 },
      })
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

    const [followersCount, followingsCount, isFollowing] = await Promise.all([
      followModel.countDocuments({
        following: userProfile.username,
      }),
      followModel.countDocuments({
        follower: userProfile.username,
      }),
      isFollowingUser(req.user.username, userProfile.username),
    ]);

    Object.assign(userProfile, {
      followersCount,
      followingsCount,
      isFollowing,
    });

    if (!isFollowing && userProfile.isPrivate) {
      userProfile.posts = undefined;
      throw new AppError("This Account is Private", 403, { user: userProfile });
    }

    const postIds = userProfile.posts.map((post) => post._id);

    const [likesCount, userLikes, userSaves] = await Promise.all([
      likeModel.aggregate([
        { $match: { post: { $in: postIds } } },
        { $group: { _id: "$post", count: { $sum: 1 } } },
      ]),

      likeModel
        .find({ post: { $in: postIds }, user: req.user._id })
        .select("post")
        .lean(),

      saveModel
        .find({ post: { $in: postIds }, user: req.user._id })
        .select("post")
        .lean(),
    ]);

    const likeCountMap = new Map(
      likesCount.map((post) => [post._id.toString(), post.count]),
    );
    const userLikedSet = new Set(userLikes.map((like) => like.post.toString()));

    const userSavedSet = new Set(userSaves.map((save) => save.post.toString()));

    userProfile.posts.forEach((post) => {
      Object.assign(post, {
        likesCount: likeCountMap.get(post._id.toString()) || 0,
        isLikedByUser: userLikedSet.has(post._id.toString()),
        isSavedByUser: userSavedSet.has(post._id.toString()),
      });
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

    const { country, info, city, postalCode, ...restOfBody } = req.body;

    const addressFields = { country, info, city, postalCode };
    const updateFields = { ...restOfBody };

    for (const [key, value] of Object.entries(addressFields)) {
      if (value !== undefined) {
        updateFields[`address.${key}`] = value;
      }
    }

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
