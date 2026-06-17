const userModel = require("./../users/user.model");
const refreshTokenGen = require("./../../../shared/utils/refreshTokenGen");

exports.createUser = async (body) => {
  const user = new userModel(body);

  const refreshToken = refreshTokenGen(user._id);
  user.refreshToken = refreshToken;

  await user.save();
  user.password = undefined;
  return user;
};
