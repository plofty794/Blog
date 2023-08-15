import Token from "../models/UserToken";

export const isRefreshToken = async (expiredAt: Date) => {
  const isRefreshToken = await Token.findOneAndRemove({ expiresAt: expiredAt });
  if (!isRefreshToken) {
    return null;
  }
  return { message: "Refresh jwt expired" };
};
