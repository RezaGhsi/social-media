const AppError = require("./../utils/AppError");

const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((e) => ({
        field: e.path[0],
        message: e.message,
      }));
      throw new AppError("Validation Error", 400, errors);
    }
    req.body = result.data;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validate;
