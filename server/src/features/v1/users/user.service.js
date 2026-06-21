const fs = require("fs");
const path = require("path");

exports.removeOldAvatar = (oldAvatarUrl) => {
  if (oldAvatarUrl.startsWith("images")) return;

  const PROJECT_ROOT = path.join(__dirname, "..", "..", "..", "..");

  const avatarUrlCheck = fs.existsSync(
    path.join(PROJECT_ROOT, "public", oldAvatarUrl),
  );

  if (!avatarUrlCheck) return;

  return fs.rmSync(path.join(PROJECT_ROOT, "public", oldAvatarUrl));
};
