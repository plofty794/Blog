import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AccessToken {
  accessToken: string | null;
  setAccessToken: (payload: string | null) => void;
}

export const useAccessTokenStore = create<AccessToken>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (payload: string | null) => set({ accessToken: payload }),
    }),
    { name: "token" }
  )
);
