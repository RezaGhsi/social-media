const { verifyToken } = require("../../../shared/middlewares/auth.middleware");
const {
  uploadPost,
} = require("../../../shared/middlewares/uploader.middleware");
const validate = require("../../../shared/middlewares/validate.middleware");
const { uploadOne, deleteOne } = require("./post.controller");
const { postUploadSchema, deletePostSchema } = require("./post.validator");

const router = require("express").Router();

router
  .route("/upload")
  .post(verifyToken, uploadPost, validate(postUploadSchema), uploadOne);

router
  .route("/:postId")
  .delete(verifyToken, validate(deletePostSchema, "params"), deleteOne);

module.exports = router;
