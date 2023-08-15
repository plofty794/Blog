import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { useAccessTokenStore } from "@/store/accessTokenStore";
import useAxiosPrivate from "./useAxiosPrivate";

function useCreateBlog() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; body: string }) => {
      return axiosPrivate.post("/api/blogs", { ...data });
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
        variant: "destructive",
      });
    },
  });
}

export default useCreateBlog;
