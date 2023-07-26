import { axiosRoute } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { BlogSchema } from "@../../../../server/src/models/Blogs";
import { AxiosError, AxiosResponse } from "axios";
import { TrashIcon } from "@radix-ui/react-icons";
import useDeleteBlog from "@/hooks/useDeleteBlog";
import Blog from "./Blog";

function Blogs() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  async function fetchBlogs() {
    const { data } = await axiosRoute.get("/api/blogs");
    return data;
  }

  if (isLoading) {
    return (
      <div className="my-3 p-2 rounded-md bg-slate-800">
        <span className="text-white font-bold text-lg">Loading...</span>
      </div>
    );
  }

  if (isError) {
    const err = error as AxiosError;
    const message = (err.response as AxiosResponse)?.data?.message;
    return (
      <div className="my-3 p-2 rounded-md bg-slate-800">
        <span className="text-white font-bold text-lg">{message}</span>
      </div>
    );
  }

  return (
    <div className="m-6 grid lg:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 w-4/5 border-black shadow shadow-black rounded">
      {data &&
        data.blogs.map((blog: BlogSchema) => (
          <Blog blog={blog} key={blog._id.toString()} />
        ))}
    </div>
  );
}

export default Blogs;
