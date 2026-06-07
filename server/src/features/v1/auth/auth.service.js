const userModel = require("./../users/user.model");

exports.createUser = async (body) => {
  const user = await userModel.create({ ...body, role: "ADMIN" });
  user.password = undefined;
  return user;
};
