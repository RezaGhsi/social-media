const path = require("path");
const fs = require("fs");

const postModel = require("./post.model");
const likeModel = require("./../like/like.model");
const saveModel = require("./../save/save.model");
const followModel = require("./../follow/follow.model");

const AppError = require("../../../shared/utils/AppError");
const successResponse = require("../../../shared/utils/response");
const { setPostsDetails } = require("./post.service");

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

exports.getHomePagePosts = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await followModel.aggregate([
      { $match: { follower: req.user.username } },
      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "username",
          as: "following",
        },
      },
      {
        $project: {
          "following._id": 1,
        },
      },
      { $unwind: "$following" },
      { $group: { _id: null, followings: { $push: "$following._id" } } },
      { $project: { _id: 0, followings: 1 } },
    ]);

    const followings = result.length ? result[0].followings : [];

    const posts = await postModel
      .find({ user: { $in: followings } })
      .sort({ _id: -1 })
      .limit(10)
      .populate({ path: "user", select: "avatarUrl name username" })
      .lean();

    await setPostsDetails(userId, posts);
    console.log(posts);

    successResponse(res, 200, { posts });
  } catch (error) {
    next(error);
  }
};
