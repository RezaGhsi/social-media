const saveModel = require("./save.model");
const AppError = require("../../../shared/utils/AppError");
const successResponse = require("../../../shared/utils/response");
const { default: mongoose } = require("mongoose");

exports.savePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

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
    const userId = req.user.id;
    const savedPosts = await saveModel
      .find({ user: userId })
      .populate("post")
      .sort({ createdAt: -1 })
      .limit(10);

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
