import { JwtPayload, decode, sign } from "jsonwebtoken";
import { UserSchema } from "../models/Users";
import Token from "../models/UserToken";
import env from "../utils/envalid";

export const generateToken = async (payload: UserSchema) => {
  if (!payload) {
    throw new Error("Payload is required.");
  }
  const { _id } = payload;
  const accessToken = sign({ _id, type: "access" }, env.ACCESS_TOKEN_KEY, {
    expiresIn: "30secs",
  });
  const refreshToken = sign({ _id, type: "refresh" }, env.REFRESH_TOKEN_KEY, {
    expiresIn: "4mins",
  });
  const { exp } = decode(refreshToken) as JwtPayload;
  const tokenExist = await Token.findOne({ userId: _id });
  if (tokenExist) {
    await Token.findOneAndRemove({ token: tokenExist.token });
  }
  const expiresAt = new Date(exp! * 1000).toLocaleString();
  await Token.create({
    userId: _id,
    token: refreshToken,
    expiresAt,
  });
  return { accessToken, refreshToken };
};
