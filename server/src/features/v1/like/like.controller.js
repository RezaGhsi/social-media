const successResponse = require("../../../shared/utils/response");
const likeModel = require("./like.model");

exports.likePost = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const like = new likeModel({
      post: postId,
      user: req.user._id,
    });

    const result = await like.save();
    successResponse(res, 201);
  } catch (error) {
    next(error);
  }
};

exports.disLikePost = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const like = await likeModel.deleteOne({ post: postId });

    successResponse(res, 200);
  } catch (error) {
    next(error);
  }
};
