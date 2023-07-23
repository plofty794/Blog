import { z } from "zod";

export const schema = z.object({
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

export type BlogSchema = z.infer<typeof schema>;
