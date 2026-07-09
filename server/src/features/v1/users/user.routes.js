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

router.route("/:username/followings").get(getFollowings);
router.route("/:username/followers").get(getFollowers);

module.exports = router;
