const { isValidObjectId } = require("mongoose");
const z = require("zod");

exports.postUploadSchema = z
  .object({
    description: z.string().max(2200).trim().optional(),
    hashtags: z.string().max(200).trim().optional(),
    // user: z.refine((value) => isValidObjectId(value), {
    //   error: "User Id is Not Valid",
    //   path: "user",
    // }),
  })
  .strict();
