const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
    },
    biography: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
      uppercase: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: "images/default-profile-pic.png",
    },
    address: {
      country: String,
      city: String,
      info: String,
      postalCode: Number,
    },
  },
  {
    timestamps: true,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  },
);

schema.pre("save", function () {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

schema.virtual("posts", {
  foreignField: "user",
  localField: "_id",
  ref: "Post",
});

schema.virtual("followers", {
  foreignField: "following",
  localField: "username",
  ref: "Follow",
});

schema.virtual("followings", {
  foreignField: "follower",
  localField: "username",
  ref: "Follow",
});

const model = mongoose.model("User", schema);

module.exports = model;
