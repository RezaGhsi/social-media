const AppError = require("./../utils/AppError");

const validate =
  (schema, field = "") =>
  (req, res, next) => {
    try {
      let data = {};
      switch (field.toLowerCase()) {
        case "params":
          data = req.params;
          break;

        default:
          data = req.body;
          break;
      }

      const result = schema.safeParse(data);
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
