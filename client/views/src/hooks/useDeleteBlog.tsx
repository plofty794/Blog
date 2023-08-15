import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { BlogSchema } from "@../../../../server/src/models/Blogs";
import { AxiosError, AxiosResponse } from "axios";
import { useUserStore } from "@/store/userStore";
import { useAccessTokenStore } from "@/store/accessTokenStore";
import useAxiosPrivate from "./useAxiosPrivate";

function useDeleteBlog() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blog: BlogSchema) => {
      return axiosPrivate.delete(`/api/blogs/${blog._id}`);
    },
    onSuccess(res: AxiosResponse) {
      toast({
        description: res.data.message,
        variant: "destructive",
      });
    },
    onError(error: AxiosError) {
      toast({
        title: "Uh oh! Something went wrong!",
        description: (error.response as AxiosResponse).data?.message,
        variant: "destructive",
      });
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
