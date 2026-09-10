const fs = require("fs");
const path = require("path");

const followModel = require("./../follow/follow.model");

exports.removeOldAvatar = (oldAvatarUrl) => {
  if (oldAvatarUrl.startsWith("images")) return;

  const PROJECT_ROOT = path.join(__dirname, "..", "..", "..", "..");

  const avatarUrlCheck = fs.existsSync(
    path.join(PROJECT_ROOT, "public", oldAvatarUrl),
  );

  if (!avatarUrlCheck) return;

  return fs.rmSync(path.join(PROJECT_ROOT, "public", oldAvatarUrl));
};

exports.isFollowingUser = async (username, profileUsername) => {
  if (username === profileUsername) return true;
  const follow = await followModel.exists({
    follower: username,
    following: profileUsername,
  });

  return !!follow;
};
