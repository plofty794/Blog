import { axiosRoute } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

function useCreateBlog() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ title, body }: { title: string; body: string }) => {
      return axiosRoute.post("/api/blogs", { title, body });
    },
    onError(error: AxiosError) {
      toast({
        title: "Uh oh! Something went wrong!",
        description: (error.response as AxiosResponse).data?.message,
        variant: "destructive",
      });
    },
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries(["blogs"]);
      toast({
        description: "Blog Added successfully!",
        color: "black",
      });
    },
  });
  return mutation;
}

export default useCreateBlog;
