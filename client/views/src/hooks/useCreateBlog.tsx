import { axiosRoute } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAccessTokenStore, useUserStore } from "@/store/userStore";

function useCreateBlog() {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const logOut = useUserStore((state) => state.setLogOut);
  return useMutation({
    mutationFn: (data: { title: string; body: string }) => {
      return axiosRoute.post(
        "/api/blogs",
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    },
    onError(error: AxiosError) {
      toast({
        title: "Uh oh! Something went wrong!",
        description: (error.response as AxiosResponse).data?.message,
        variant: "destructive",
      });
      if (error.response?.status === 500) {
        setAccessToken(null);
        logOut();
      }
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
