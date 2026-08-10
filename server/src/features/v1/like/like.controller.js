const successResponse = require("../../../shared/utils/response");
const likeModel = require("./like.model");
const postModel = require("./../posts/post.model");
const AppError = require("../../../shared/utils/AppError");
const { default: mongoose } = require("mongoose");

exports.likePost = async (req, res, next) => {
  try {
    const { postId } = req.body;

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
        throw new AppError("You are not allowed to like this post", 403);
      }
    }

    const isAlreadyLiked = await likeModel.exists({
      post: postId,
      user: req.user._id,
    });
    if (!isAlreadyLiked) {
      const like = new likeModel({
        post: postId,
        user: req.user._id,
      });

      const result = await like.save();
      return successResponse(res, 201);
    }

    successResponse(res, 201);
  } catch (error) {
    next(error);
  }
};

exports.disLikePost = async (req, res, next) => {
  try {
    const { postId } = req.body;

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
        throw new AppError("You are not allowed to dislike this post", 403);
      }
    }

    const like = await likeModel.findOneAndDelete({
      post: postId,
      user: req.user._id,
    });
    if (!like) {
      throw new AppError("You have not liked this post", 400);
    }

    successResponse(res, 200);
  } catch (error) {
    next(error);
  }
};
