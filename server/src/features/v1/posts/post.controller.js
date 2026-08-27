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

    const [deletedPost] = await Promise.all([
      await postModel.findByIdAndDelete(postId),
      await likeModel.deleteMany({ post: postId }),
      await saveModel.deleteMany({ post: postId }),
      // and delete comments
    ]);

    if (!deletedPost) {
      throw new AppError("Post Not Found", 404);
    }

    successResponse(res, 200, { message: "Post Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
