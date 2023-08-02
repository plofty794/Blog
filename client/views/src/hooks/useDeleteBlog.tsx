import { axiosRoute } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { BlogSchema } from "@../../../../server/src/models/Blogs";
import { AxiosResponse } from "axios";

function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blog: BlogSchema) => {
      return axiosRoute.delete(`/api/blogs/${blog._id}`);
    },
    onSuccess(res: AxiosResponse) {
      toast({
        description: res.data.message,
        className: "success-toast",
        variant: "default",
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
