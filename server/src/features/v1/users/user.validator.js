const { z } = require("zod");

exports.getUserProfileSchema = z
  .object({
    username: z.string().min(4).max(32),
  })
  .strict();
