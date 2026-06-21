const { MulterError } = require("multer");
const { uploadAvatar, uploadPost } = require("../config/multer");

const handleUpload = (uploader) => (req, res, next) => {
  uploader(req, res, (err) => {
    if (!err) return next();

    if (err.code === "INVALID_FILE_TYPE") {
      return res.status(400).json({ success: false, message: err.message });
    }

    if (err.code === "INVALID_FILE_SIZE") {
      return res
        .status(400)
        .json({ success: false, message: "File is too Large" });
    }

    if (err instanceof MulterError) {
      return res.status(400).json({ success: false, message: err.message });
    }

    next(err);
  });
};

module.exports = {
  uploadAvatar: handleUpload(uploadAvatar),
  uploadPost: handleUpload(uploadPost),
};
