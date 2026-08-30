const path = require("path");
const fs = require("fs");

const postModel = require("./post.model");
const likeModel = require("./../like/like.model");
const saveModel = require("./../save/save.model");
const AppError = require("../../../shared/utils/AppError");
const successResponse = require("../../../shared/utils/response");

exports.uploadOne = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError("No File Uploaded");

    const { hashtags, description } = req.body;
    const hashtagsList = hashtags?.replaceAll(" ", "")?.split(",");

    const mediaUrl = `uploads/posts/${req.file.filename}`;

    const post = await postModel.create({
      hashtags: hashtagsList,
      description,
      mediaUrl,
      user: req.user._id,
    });

    return successResponse(res, 201, {
      message: "New Post Uploaded Successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id.toString();

    const post = await postModel.findById(postId).select("user mediaUrl");
    if (!post) {
      throw new AppError("Post Not Found", 404);
    }

    if (post.user.toString() !== userId) {
      throw new AppError("You Can't Delete this Post", 403);
    }

    const mediaPath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "public",
      post.mediaUrl,
    );

    await Promise.all([
      fs.rm(mediaPath, (err) => {
        if (err) {
          throw err;
        }
      }),

      postModel.findByIdAndDelete(postId),
      likeModel.deleteMany({ post: postId }),
      saveModel.deleteMany({ post: postId }),
      // and delete comments
    ]);

    successResponse(res, 200, { message: "Post Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
