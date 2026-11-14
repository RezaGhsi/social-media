const { z } = require("zod");

exports.getUserProfileSchema = z
  .object({
    username: z.string().min(4).max(32),
  })
  .strict();

exports.profileUpdateSchema = z
  .object({
    email: z.email().optional(),
    username: z.string().min(4).max(32).optional(),
    name: z.string().min(3).max(48).optional(),
    bio: z.string().min(1).max(100).optional(),
    birthDate: z.refine((value) => Date.parse(value)).optional(),
    biography: z.string().min(1).max(100).optional(),
    // password: z.string().min(8).max(32).optional(),
    country: z.string().min(3).max(20).optional(),
    website: z.string().min(4).max(30).optional(),
  })
  .strict();
