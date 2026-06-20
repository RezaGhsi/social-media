const userModel = require("./../users/user.model");
const refreshTokenGen = require("./../../../shared/utils/refreshTokenGen");
const AppError = require("./../../../shared/utils/AppError");

exports.createUser = async (body) => {
  const user = new userModel(body);

  const refreshToken = refreshTokenGen(user._id);
  user.refreshToken = refreshToken;
  await user.save();

  return user;
};

exports.checkUser = async (identifier) => {
  const user = await userModel.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });
  if (!user) throw new AppError("Invalid Email or Username or Password", 401);

  return user;
};

exports.updateUserRefreshToken = async (user) => {
  const refreshToken = refreshTokenGen(user._id);
  await userModel.updateOne({ _id: user._id }, { $set: { refreshToken } });
  return refreshToken;
};
