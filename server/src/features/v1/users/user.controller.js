const userModel = require("./user.model");
const AppError = require("../../../shared/utils/AppError");
const successResponse = require("../../../shared/utils/response");
const { removeOldAvatar, isFollowingUser } = require("./user.service");

exports.getUserPage = async (req, res, next) => {
  try {
    const { username } = req.params;

    const userProfile = await userModel
      .findOne({ username })
      .populate("posts")
      .select("-role -password -isVerified -refreshToken")
      .lean();

    if (!userProfile) throw new AppError("Page not Found", 404);
    if (!userProfile.isPrivate) {
      return successResponse(res, 200, { userProfile });
    }

    const isFollowing = await isFollowingUser(
      req.user.username,
      userProfile.username,
    );

    if (!isFollowing) throw new AppError("This Account is Private", 403);

    return successResponse(res, 200, { userProfile });
  } catch (error) {
    next(error);
  }
};

exports.userAvatarUpload = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError("No File Uploaded");

    const avatarUrl = `uploads/profiles/${req.file.filename}`;

    removeOldAvatar(req.user.avatarUrl);

    const user = await userModel
      .findByIdAndUpdate(
        req.user._id,
        { avatarUrl },
        { returnDocument: "after" },
      )
      .select("-password");

    successResponse(res, 201, { user, message: "Avatar Updated Successfully" });
  } catch (error) {
    next(error);
  }
};
