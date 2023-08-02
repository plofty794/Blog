import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  setUser: () => set((state: any) => ({ user: state.user })),
  setLogOut: () => set(() => ({ user: null })),
}));
