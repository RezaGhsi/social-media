const { isValidObjectId } = require("mongoose");
const { z } = require("zod");

exports.saveSchema = z
  .object({
    postId: z.refine((value) => isValidObjectId(value), {
      error: "Invalid input: expected ObjectId",
      path: "postID",
    }),
  })
  .strict();
