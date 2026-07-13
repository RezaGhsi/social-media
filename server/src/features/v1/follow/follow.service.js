const followModel = require("./follow.model");
const userModel = require("./../users/user.model");
const AppError = require("../../../shared/utils/AppError");

exports.checkUserExits = async (username) => {
  const isUserExits = await userModel.exists({ username });
  if (!isUserExits) {
    throw new AppError("Page Not Found", 404);
  }
  return isUserExits;
};

exports.checkAlreadyFollowing = async (follower, following) => {
  const isAlreadyFollowing = await followModel.findOne({
    follower,
    following,
  });
  return isAlreadyFollowing;
};

exports.getFollowingsList = async (username, targetUsername) => {
  const followings = await followModel
    .find({ follower: targetUsername })
    .select("following")
    .populate("followingUser", "username name avatarUrl")
    .lean();

  const followingUsernames = [];
  const followingList = followings.map((follow) => {
    followingUsernames.push(follow.followingUser.username);
    return follow.followingUser;
  });

  const myFollows = await followModel
    .find({
      follower: username,
      following: { $in: followingUsernames },
    })
    .select("following")
    .lean();

  const followingSet = new Set(myFollows.map((follow) => follow.following));

  followingList.map((user, i) => {
    followingList[i] = {
      ...user,
      isFollowing: followingSet.has(user.username),
    };
  });

  return followingList;
};

exports.getFollowersList = async (username, targetUsername) => {
  const followers = await followModel
    .find({ following: targetUsername })
    .select("follower")
    .populate("followerUser", "username name avatarUrl")
    .lean();

  const followerUsernames = [];
  const followerList = followers.map((follow) => {
    followerUsernames.push(follow.followerUser.username);
    return follow.followerUser;
  });

  const myFollows = await followModel
    .find({
      follower: username,
      following: { $in: followerUsernames },
    })
    .select("following")
    .lean();

  const followingSet = new Set(myFollows.map((follow) => follow.following));

  followerList.forEach((user, i) => {
    followerList[i] = {
      ...user,
      isFollowing: followingSet.has(user.username),
    };
  });

  return followerList;
};
