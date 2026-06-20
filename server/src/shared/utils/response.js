const successResponse = (res, statusCode = 200, data = {}) => {
  return res.status(statusCode).json({
    status: statusCode,
    success: true,
    ...data,
  });
};

module.exports = successResponse;
