const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    mediaUrl: {
      required: true,
      type: String,
    },
    description: String,
    hashtags: {
      type: [String],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const model = mongoose.model("Post", schema);

module.exports = model;
