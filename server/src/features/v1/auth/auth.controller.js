const successResponse = require("../../../shared/utils/response");
const { createUser } = require("./auth.service");

exports.register = async (req, res, next) => {
  try {
    const user = await createUser(req.body);

    return successResponse(res, 201, user);
  } catch (error) {
    next(error);
  }
};
