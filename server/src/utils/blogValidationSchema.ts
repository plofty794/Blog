import joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const validatePasswordUserSignUp = (password: string) => {
  const schema = joi.object({
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate({ password });
};
