import { axiosPrivateRoute } from "@/api/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserObject = {
  email: string;
  username: string;
};

interface User {
  user: UserObject | null;
  setUser: (payload: UserObject) => void;
  setLogOut: () => void;
}

export const useUserStore = create<User>()(
  persist(
    (set) => ({
      user: null,
      setUser: (payload) => set({ user: payload }),
      setLogOut: async () => {
        await axiosPrivateRoute.delete("/api/users/logOut");
        set({ user: null });
      },
    }),
    {
      name: "user",
    }
  )
);
