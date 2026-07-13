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
} = require("./user.controller");
const validate = require("./../../../shared/middlewares/validate.middleware");
const { getUserProfileSchema } = require("./user.validator");

const router = require("express").Router();

router.route("/uploadAvatar").put(verifyToken, uploadAvatar, userAvatarUpload);
router
  .route("/:username")
  .get(verifyToken, validate(getUserProfileSchema, "params"), getUserPage);

router.route("/:username/followings").get(verifyToken, getFollowings);
router.route("/:username/followers").get(verifyToken, getFollowers);

module.exports = router;
