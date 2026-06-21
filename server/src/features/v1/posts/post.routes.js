const { verifyToken } = require("../../../shared/middlewares/auth.middleware");
const {
  uploadPost,
} = require("../../../shared/middlewares/uploader.middleware");
const validate = require("../../../shared/middlewares/validate.middleware");
const { uploadOne } = require("./post.controller");
const { postUploadSchema } = require("./post.validator");

const router = require("express").Router();

router
  .route("/upload")
  .post(verifyToken, validate(postUploadSchema), uploadPost, uploadOne);

module.exports = router;
