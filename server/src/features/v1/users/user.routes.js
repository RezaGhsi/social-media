const {
  uploadAvatar,
} = require("../../../shared/middlewares/uploader.middleware");
const {
  verifyToken,
} = require("./../../../shared/middlewares/auth.middleware");
const { userAvatarUpload, getUserPage } = require("./user.controller");
const validate = require("./../../../shared/middlewares/validate.middleware");
const { getUserProfileSchema } = require("./user.validator");

const router = require("express").Router();

router.route("/uploadAvatar").put(verifyToken, uploadAvatar, userAvatarUpload);
router
  .route("/:username")
  .get(verifyToken, validate(getUserProfileSchema, "params"), getUserPage);

module.exports = router;
