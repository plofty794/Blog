import { axiosPrivateRoute } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { AxiosError, AxiosResponse } from "axios";
import { SigninSchema } from "../zod schema/zodSchema";
import { useUserStore } from "@/store/userStore";
import { useAccessTokenStore } from "@/store/accessTokenStore";

function useSignin() {
  const setUser = useUserStore((state) => state.setUser);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  return useMutation({
    mutationFn: (user: SigninSchema) => {
      return axiosPrivateRoute.post("/api/users/signin", {
        ...user,
      });
    },
    onSuccess(res) {
      toast({
        title: "Welcome,",
        description: `${res.data.user.username}`,
        variant: "destructive",
      });
      setUser({ ...res.data.user });
      setAccessToken(res.data.accessToken);
    },
    onError(err) {
      const error = err as AxiosError;
      const message = (error.response as AxiosResponse).data.message;
      toast({
        title: "Uh oh! Something went wrong.",
        description: message,
        className: "error-toast",
      });
    },
  });
}

export default useSignin;
