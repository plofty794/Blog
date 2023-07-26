import { z } from "zod";

export const zodBlogSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Title should be longer than 10 characters" })
    .max(30, { message: "Title should be less than 30 characters" })
    .trim(),
  body: z
    .string()
    .min(30, { message: "Content should be longer than 30 characters" })
    .max(100, { message: "Content should be less than 100 characters" })
    .trim(),
});

export const zodSignupSchema = z
  .object({
    username: z
      .string()
      .regex(/[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9]){5,12}$/, {
        message: "Invalid username",
      })
      .trim(),
    email: z.string().email().trim(),
    password: z
      .string()
      .min(10, { message: "Password should be longer than 10 characters" })
      .max(20, { message: "Password should be less than 20 characters" })
      .trim(),
    confirmPassword: z
      .string()
      .min(10, { message: "Password should be longer than 10 characters" })
      .max(20, { message: "Password should be less than 20 characters" })
      .trim(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password's don't match",
    path: ["confirmPassword"],
  });

export type BlogSchema = z.infer<typeof zodBlogSchema>;
export type SignupSchema = z.infer<typeof zodSignupSchema>;
