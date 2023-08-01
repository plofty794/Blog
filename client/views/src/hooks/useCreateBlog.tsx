import { axiosRoute } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; body: string }) => {
      return axiosRoute.post("/api/blogs", { ...data });
    },
    onError(error: AxiosError) {
      toast({
        title: "Uh oh! Something went wrong!",
        description: (error.response as AxiosResponse).data?.message,
        variant: "destructive",
      });
    },
    onSuccess(res: AxiosResponse) {
      queryClient.invalidateQueries(["blogs"]);
      toast({
        title: `Blog ${res.data.newBlog.title}`,
        description: "Blog Added successfully!",
        variant: "default",
        className: "success-toast",
      });
    },
  });
}

export default useCreateBlog;
