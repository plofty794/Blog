import { axiosRoute } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { SignupSchema } from "../zod schema/zodSchema";

function useSignup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: SignupSchema) => {
      const { username, email, password } = user;
      return axiosRoute.post("/api/users/signup", {
        username,
        email,
        password,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries(["blogs"]);
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
