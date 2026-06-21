const {
  uploadAvatar,
} = require("../../../shared/middlewares/uploader.middleware");
const {
  verifyToken,
} = require("./../../../shared/middlewares/auth.middleware");
const { userAvatarUpload } = require("./user.controller");

const router = require("express").Router();

router.route("/uploadAvatar").put(verifyToken, uploadAvatar, userAvatarUpload);

module.exports = router;
