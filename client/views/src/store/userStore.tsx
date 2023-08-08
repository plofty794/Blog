import { axiosPrivateRoute } from "@/api/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  user: { user: object } | null;
  setUser: (payload: { user: object }) => void;
  setLogOut: () => void;
}

export const useUserStore = create<User>()(
  persist(
    (set) => ({
      user: null,
      setUser: (payload) => set({ user: payload }),
      setLogOut: async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        await axiosPrivateRoute.delete("/api/users/logOut");
        set({ user: null });
      },
    }),
    {
      name: "user",
    }
  )
);
