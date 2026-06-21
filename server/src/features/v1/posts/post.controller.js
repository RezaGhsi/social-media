const postModel = require("./post.model");
const AppError = require("../../../shared/utils/AppError");
const successResponse = require("../../../shared/utils/response");

exports.uploadOne = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError("No File Uploaded");

    const { hashtags, description } = req.body;
    const hashtagsList = hashtags.replaceAll(" ", "").split(",");

    const mediaUrl = `uploads/posts/${req.file.filename}`;

    const post = await postModel.create({
      hashtags: hashtagsList,
      description,
      mediaUrl,
      user: req.user._id,
    });

    return successResponse(res, 201, {
      message: "New Post Uploaded Successfully",
    });
  } catch (error) {
    next(error);
  }
};
