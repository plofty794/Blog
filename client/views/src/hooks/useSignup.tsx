import { axiosPrivateRoute } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { AxiosError, AxiosResponse } from "axios";
import { SignupSchema } from "../zod schema/zodSchema";

function useSignup() {
  return useMutation({
    mutationFn: (user: SignupSchema) => {
      return axiosPrivateRoute.post("/api/users/signup", {
        ...user,
      });
    },
    onSuccess() {
      toast({
        description: "User created successfully",
        variant: "destructive",
      });
    },
    onError(error: AxiosError) {
      toast({
        title: "Uh oh! Something went wrong!",
        description: (error.response as AxiosResponse).data?.message,
        variant: "destructive",
        className: "error-toast",
      });
    },
  });
}

export default useSignup;
