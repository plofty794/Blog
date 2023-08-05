import { create } from "zustand";

interface User {
  user: unknown;
  setUser: (payload: string) => void;
  setLogOut: () => void;
}

export const useUserStore = create<User>((set) => ({
  user: null,
  setUser: (payload) => set(() => ({ user: payload })),
  setLogOut: () => set(() => ({ user: null })),
}));
