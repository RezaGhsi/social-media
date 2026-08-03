const likeModel = require("./../like/like.model");

exports.postLikesCount = async (posts) => {
  posts.forEach(async (post) => {
    const likesCount = await likeModel.countDocuments({ post: post._id });
    Object.assign(post, likesCount);
  });

  return posts;
};
