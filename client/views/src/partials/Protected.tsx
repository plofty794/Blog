import { useAccessTokenStore } from "@/store/accessTokenStore";
import { useUserStore } from "@/store/userStore";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function Protected({ children }: { children: ReactNode }) {
  const user = useUserStore((state) => state.user);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  if (!user && !accessToken) {
    return <Navigate to={"/signin"} />;
  }

  return children;
}

export default Protected;
