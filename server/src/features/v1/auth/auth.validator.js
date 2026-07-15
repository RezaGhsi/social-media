const { z } = require("zod");

exports.registerSchema = z
  .object({
    email: z.email(),
    username: z.string().min(4).max(32),
    name: z.string().min(3).max(48),
    age: z.refine((value) => Number(value), {
      error: "Invalid input: expected number",
      path: "age",
    }),
    birthDate: z.date().optional(),
    // .min(7)
    // .max(120),
    biography: z.string().min(1).max(100).optional(),
    password: z.string().min(8).max(32),
    confirmPassword: z.string().min(8).max(32),
  })
  .refine((body) => body.confirmPassword === body.password, {
    error: "Confirm Password is Not Equal to Password",
    path: ["confirmPassword"],
  })
  .strict();

exports.loginSchema = z
  .object({
    identifier: z.string().min(4).max(32),
    password: z.string().min(8).max(32),
  })
  .strict();
