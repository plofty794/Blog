import { create } from "zustand";

interface User {
  user: { user: object } | null;
  setUser: (payload: { user: object }) => void;
  setLogOut: () => void;
}

interface AccessToken {
  accessToken: string | null;
  setAccessToken: (payload: string | null) => void;
}

export const useUserStore = create<User>((set) => ({
  user: null,
  setUser: (payload) => set(() => ({ user: payload })),
  setLogOut: () => set(() => ({ user: null })),
}));

export const useAccessTokenStore = create<AccessToken>((set) => ({
  accessToken: null,
  setAccessToken: (payload: string | null) =>
    set(() => ({ accessToken: payload })),
}));
