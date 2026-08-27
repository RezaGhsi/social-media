const saveModel = require("./save.model");
const postModel = require("./../posts/post.model");
const likeModel = require("./../like/like.model");
const AppError = require("../../../shared/utils/AppError");
const successResponse = require("../../../shared/utils/response");
const { default: mongoose } = require("mongoose");
const { hasAccessToPost } = require("../posts/post.service");

exports.savePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    await hasAccessToPost(postId, userId);

    const existingSave = await saveModel.exists({ post: postId, user: userId });
    if (existingSave) {
      throw new AppError("Post already saved", 400);
    }

    const newSave = await saveModel.create({
      post: postId,
      user: userId,
    });
    successResponse(res, 201, { message: "Post saved successfully", newSave });
  } catch (error) {
    next(error);
  }
};

exports.getSavedPosts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const saves = await saveModel
      .find({ user: userId })
      .populate({
        path: "post",
        populate: { path: "user", select: ["name", "avatarUrl", "username"] },
      })
      .sort({ _id: -1 })
      .limit(10)
      .lean();

    let savedPosts = [];

    const postIds = saves.map((save) => {
      savedPosts.push(save.post);
      return save.post._id;
    });

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

    savedPosts.forEach((post) => {
      Object.assign(post, {
        likesCount: likeCountMap.get(post._id.toString()) || 0,
        isLikedByUser: userLikedSet.has(post._id.toString()),
        isSavedByUser: userSavedSet.has(post._id.toString()),
      });
    });

    successResponse(res, 200, {
      message: "Saved posts retrieved successfully",
      savedPosts,
    });
  } catch (error) {
    next(error);
  }
};

exports.unSavePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const deletedSave = await saveModel.findOneAndDelete({
      post: postId,
      user: userId,
    });
    if (deletedSave) {
      return successResponse(res, 200, {
        message: "Post unsaved successfully",
      });
    }

    successResponse(res, 200, { message: "Post unsaved successfully" });
  } catch (error) {
    next(error);
  }
};
