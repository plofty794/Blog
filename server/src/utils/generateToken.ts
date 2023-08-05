import { sign } from "jsonwebtoken";
import { UserSchema } from "../models/Users";
import Token from "../models/UserToken";
import env from "../utils/envalid";

export const generateToken = async (payload: UserSchema) => {
  if (!payload) {
    throw new Error("Payload is required.");
  }
  const { _id } = payload;
  const accessToken = sign({ _id }, env.ACCESS_TOKEN_KEY, {
    expiresIn: "2mins",
  });
  const refreshToken = sign({ _id }, env.REFRESH_TOKEN_KEY, {
    expiresIn: "4mins",
  });
  const tokenExist = await Token.findOne({ userId: _id });
  if (tokenExist) {
    await Token.findOneAndRemove({ token: tokenExist.token });
  }
  await Token.create({ userId: _id, token: refreshToken });
  return { accessToken, refreshToken };
};
