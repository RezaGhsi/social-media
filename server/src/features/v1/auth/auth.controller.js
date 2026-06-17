const accessTokenGen = require("../../../shared/utils/accessTokenGen");
const successResponse = require("../../../shared/utils/response");
const {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} = require("../../../shared/utils/setTokenCookie");
const { createUser } = require("./auth.service");

exports.register = async (req, res, next) => {
  try {
    const user = await createUser(req.body);

    const accessToken = accessTokenGen(user._id);
    const refreshToken = user.refreshToken;

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);

    return successResponse(res, 201, user);
  } catch (error) {
    next(error);
  }
};
