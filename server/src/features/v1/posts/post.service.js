const mongoose = require("mongoose");

const postModel = require("./post.model");
const likeModel = require("./../like/like.model");
const saveModel = require("./../save/save.model");
const { isFollowingUser } = require("../users/user.service");
const AppError = require("../../../shared/utils/AppError");

exports.postLikesCount = async (posts) => {
  posts.forEach(async (post) => {
    const likesCount = await likeModel.countDocuments({ post: post._id });
    Object.assign(post, likesCount);
  });

  return posts;
};

exports.hasAccessToPost = async (postId, userId) => {
  const [post] = await postModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(postId) } },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        "user.username": 1,
        "user.isPrivate": 1,
      },
    },
  ]);

  if (!post) {
    throw new AppError("Post Not Found", 404);
  }

  if (post.user.isPrivate) {
    const isFollowing = await isFollowingUser(
      req.user.username,
      post.user.username,
    );
    if (!isFollowing) {
      throw new AppError("You don't have access to this post", 403);
    }
  }
};

exports.setPostsDetails = async (userId, posts) => {
  const postIds = posts.map((post) => post._id);

  const [likesCount, userLikes, userSaves] = await Promise.all([
    likeModel.aggregate([
      { $match: { post: { $in: postIds } } },
      { $group: { _id: "$post", count: { $sum: 1 } } },
    ]),

    likeModel
      .find({ post: { $in: postIds }, user: userId })
      .select("post")
      .lean(),

    saveModel
      .find({ post: { $in: postIds }, user: userId })
      .select("post")
      .lean(),
  ]);

  const likeCountMap = new Map(
    likesCount.map((post) => [post._id.toString(), post.count]),
  );
  const userLikedSet = new Set(userLikes.map((like) => like.post.toString()));

  const userSavedSet = new Set(userSaves.map((save) => save.post.toString()));

  posts.forEach((post) => {
    Object.assign(post, {
      likesCount: likeCountMap.get(post._id.toString()) || 0,
      isLikedByUser: userLikedSet.has(post._id.toString()),
      isSavedByUser: userSavedSet.has(post._id.toString()),
    });
  });
};
