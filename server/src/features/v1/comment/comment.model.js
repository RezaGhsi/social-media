const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isReply: {
      type: Boolean,
      default: false,
    },
    mainComment: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
      required: false,
    },
  },
  { timestamps: true },
);

const model = mongoose.model("Comment", schema);

module.exports = model;
