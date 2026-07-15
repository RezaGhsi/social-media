const {
  uploadAvatar,
} = require("../../../shared/middlewares/uploader.middleware");
const {
  verifyToken,
} = require("./../../../shared/middlewares/auth.middleware");
const {
  userAvatarUpload,
  getUserPage,
  getFollowings,
  getFollowers,
  updateUserInfo,
} = require("./user.controller");
const validate = require("./../../../shared/middlewares/validate.middleware");
const {
  getUserProfileSchema,
  profileUpdateSchema,
} = require("./user.validator");

const router = require("express").Router();

router.route("/upload/avatar").put(verifyToken, uploadAvatar, userAvatarUpload);
router
  .route("/:username")
  .get(verifyToken, validate(getUserProfileSchema, "params"), getUserPage);

router.route("/:username/followings").get(verifyToken, getFollowings);
router.route("/:username/followers").get(verifyToken, getFollowers);

router
  .route("/update/profile")
  .put(verifyToken, validate(profileUpdateSchema), updateUserInfo);

module.exports = router;
