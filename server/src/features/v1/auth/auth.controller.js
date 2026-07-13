const accessTokenGen = require("../../../shared/utils/accessTokenGen");
const successResponse = require("../../../shared/utils/response");
const {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} = require("../../../shared/utils/setTokenCookie");
const {
  createUser,
  checkUser,
  updateUserRefreshToken,
} = require("./auth.service");
const checkPassword = require("./../../../shared/utils/checkPassword");
const refreshTokenGen = require("../../../shared/utils/refreshTokenGen");
const { getFollowingsList } = require("../follow/follow.service");

exports.register = async (req, res, next) => {
  try {
    const user = await createUser(req.body);

    const accessToken = accessTokenGen(user._id);

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, user.refreshToken);

    user.password = undefined;
    user.refreshToken = undefined;

    return successResponse(res, 201, { user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await checkUser(req.body.identifier);
    checkPassword(req.body.password, user.password);

    const refreshToken = await updateUserRefreshToken(user);

    const accessToken = accessTokenGen(user._id);

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);

    user.password = undefined;
    user.refreshToken = undefined;

    return successResponse(res, 200, { message: "Login Successful", user });
  } catch (error) {
    next(error);
  }
};

exports.getAccessToken = async (req, res, next) => {
  try {
    const accessToken = accessTokenGen(req.user._id);

    setAccessTokenCookie(res, accessToken);

    return successResponse(res, 200, { user: req.user });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    return successResponse(res, 200, { user: req.user });
  } catch (error) {
    next(error);
  }
};
