import joi from "joi";

export const validateBlog = (reqBody: { title?: string; body?: string }) => {
  const schema = joi.object({
    title: joi.string().min(5).required().label("Title"),
    body: joi.string().min(20).required().label("Body"),
  });
  return schema.validate(reqBody);
};
