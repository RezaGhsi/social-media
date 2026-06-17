const z = require("zod");

exports.registerSchema = z
  .object({
    email: z.email(),
    username: z.string().min(4).max(32),
    name: z.string().min(3).max(48),
    age: z.number().min(7).max(120),
    biography: z.string().min(1).max(100).optional(),
    password: z.string().min(8).max(32),
    confirmPassword: z.string().min(8).max(32),
  })
  .refine((body) => body.confirmPassword === body.password, {
    error: "Confirm Password is Not Equal to Password",
    path: ["confirmPassword"],
  })
  .strict();
