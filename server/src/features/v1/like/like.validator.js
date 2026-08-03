const { isValidObjectId } = require("mongoose");
const { z } = require("zod");

exports.likeSchema = z
  .object({
    postId: z.refine((value) => isValidObjectId(value), {
      error: "Invalid input: expected ObjectId",
      path: "postID",
    }),
  })
  .strict();
