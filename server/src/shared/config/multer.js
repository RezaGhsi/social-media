const multer = require("multer");
const fs = require("fs");
const path = require("path");

const checkDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const ALLOWED_AVATAR_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_POST_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
];

const postFilter = (req, file, cb) => {
  if (ALLOWED_POST_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      Object.assign(new Error("Only Images, Videos, and Gif's are Allowed"), {
        code: "INVALID_FILE_TYPE",
      }),
      false,
    );
  }
};

const avatarFilter = (req, file, cb) => {
  if (ALLOWED_AVATAR_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      Object.assign(new Error("Only Images are Allowed"), {
        code: "INVALID_FILE_TYPE",
      }),
      false,
    );
  }
};

const createStorage = (dest) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      checkDir(dest);
      cb(null, path.join(__dirname, "..", "..", "..", "public", dest));
    },

    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
      cb(null, uniqueName);
    },
  });
};

exports.uploadAvatar = multer({
  storage: createStorage("uploads/profiles"),
  fileFilter: avatarFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("avatar");

exports.uploadPost = multer({
  storage: createStorage("uploads/posts"),
  fileFilter: postFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
}).single("media");
