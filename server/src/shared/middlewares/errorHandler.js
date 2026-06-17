const errorHandler = async (err, req, res, next) => {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    const messages = {
      email: "This Email is Already Registered",
      username: "This Username is Already Registered",
    };

    return res
      .status(409)
      .json({ status: 409, success: false, message: messages[field] });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Error!";

  console.error(err);
  return res.status(statusCode).json({
    status: statusCode,
    success: false,
    message: message,
    data: err.data,
  });
};

module.exports = errorHandler;
