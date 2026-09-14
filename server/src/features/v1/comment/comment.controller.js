const commentModel = require("./comment.model");
const postModel = require("./../posts/post.model");

const successResponse = require("./../../../shared/utils/response");
const AppError = require("./../../../shared/utils/AppError");
const { isValidObjectId } = require("mongoose");

exports.createComment = async (req, res, next) => {
  try {
    const { postId, text } = req.body;
    const userId = req.user._id;

    const isPostExists = await postModel.exists({ _id: postId });
    if (!isPostExists) {
      throw new AppError("Post Not Found", 404);
    }

    const newComment = new commentModel({
      post: postId,
      user: userId,
      text,
    });
    await newComment.save();

    successResponse(res, 201, { comment: newComment });
  } catch (error) {
    next(error);
  }
};

exports.replyComment = async (req, res, next) => {
  try {
    const { text, mainComment } = req.body;
    const userId = req.user._id;

    const isMainCommentExists = await commentModel
      .findById(mainComment)
      .select("post");
    if (!isMainCommentExists) {
      throw new AppError("mainComment Not Found", 404);
    }

    const newReplyComment = new commentModel({
      post: isMainCommentExists.post,
      user: userId,
      text,
      isReply: true,
      mainComment: mainComment,
    });
    await newReplyComment.save();

    successResponse(res, 201, { comment: newReplyComment });
  } catch (error) {
    next(error);
  }
};

exports.getPostComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { cursor } = req.query;

    if (cursor && !isValidObjectId(cursor))
      throw new AppError("Validation Error", 400, {
        field: "cursor",
        message: "Invalid input: expected ObjectId",
      });

    const post = await postModel.exists({ _id: postId });
    if (!post) {
      throw new AppError("Post Not Found", 404);
    }

    const limit = 10;

    const query = { post: postId };
    if (cursor) query._id = { $lt: cursor };

    const comments = await commentModel
      .find(query)
      .sort({ _id: -1 })
      .populate("user", "username name avatarUrl")
      .limit(limit + 1)
      .lean();

    const hasMore = comments.length > limit;
    const nextCursor = hasMore ? comments.pop()._id : null;

    successResponse(res, 200, { comments, hasMore, nextCursor });
  } catch (error) {
    next(error);
  }
};
