import { axiosRoute } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { SignupSchema } from "../zod schema/zodSchema";

function useSignup() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (user: SignupSchema) => {
      const { username, email, password } = user;
      return axiosRoute.post("/api/users", { username, email, password });
    },
    onSuccess(res: AxiosResponse) {
      console.log(res);
      queryClient.invalidateQueries(["blogs"]);
      toast({
        description: "User created successfully",
        variant: "destructive",
      });
    },
    onError(error) {
      console.log(error);
    },
  });
  return mutation;
}

export default useSignup;
