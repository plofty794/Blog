import { axiosRoute } from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { BlogSchema } from "@../../../../server/src/models/Blogs";
import { AxiosResponse } from "axios";

function useDeleteBlog() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (blog: BlogSchema) => {
      return axiosRoute.delete(`/api/blogs/${blog._id}`);
    },
    onSuccess(res: AxiosResponse) {
      console.log(res);
      queryClient.invalidateQueries(["blogs"]);
      toast({
        description: res.data.message,
      });
    },
  });
  return mutation;
}

export default useDeleteBlog;
