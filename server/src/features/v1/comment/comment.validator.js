const z = require("zod");
const { isValidObjectId } = require("mongoose");

exports.newCommentSchema = z
  .object({
    text: z.string().max(500).trim(),
    postId: z.refine((value) => isValidObjectId(value), {
      error: "Invalid input: expected ObjectId",
      path: "postId",
    }),
  })
  .strict();
