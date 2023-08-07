import { axiosRoute } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { BlogSchema } from "@../../../../server/src/models/Blogs";
import { AxiosError, AxiosResponse } from "axios";
import { useAccessTokenStore, useUserStore } from "@/store/userStore";

function useDeleteBlog() {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const logOut = useUserStore((state) => state.setLogOut);
  return useMutation({
    mutationFn: (blog: BlogSchema) => {
      return axiosRoute.delete(`/api/blogs/${blog._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    onSuccess(res: AxiosResponse) {
      toast({
        description: res.data.message,
        className: "success-toast",
        variant: "default",
      });
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
    onSettled(_, __, variables) {
      queryClient.setQueryData(["blogs"], (oldData: any) => {
        const newData = oldData.pages.map((page: []) =>
          page.filter((old: BlogSchema) => variables._id != old._id)
        );
        return { pageParams: [undefined], pages: newData };
      });
    },
  });
}

export default useDeleteBlog;
