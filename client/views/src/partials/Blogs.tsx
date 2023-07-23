import { axiosRoute } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { BlogSchema } from "@../../../../server/src/models/Blogs";
import { AxiosError, AxiosResponse } from "axios";
import { TrashIcon } from "@radix-ui/react-icons";
import useDeleteBlog from "@/hooks/useDeleteBlog";

function Blogs() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const { mutate } = useDeleteBlog();

  async function fetchBlogs() {
    const { data } = await axiosRoute.get("/api/blogs");
    return data;
  }

  function handleTrashClick(blog: BlogSchema) {
    mutate(blog);
  }

  if (isLoading) {
    return (
      <div className="mb-3 p-2 rounded-md bg-slate-800">
        <span className="text-white font-bold text-lg">Loading...</span>
      </div>
    );
  }

  if (isError) {
    const err = error as AxiosError;
    const message = (err.response as AxiosResponse)?.data?.message;
    return (
      <div className="mb-3 p-2 rounded-md bg-slate-800">
        <span className="text-white font-bold text-lg">{message}</span>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 w-4/5 border-black shadow shadow-black rounded">
      {data &&
        data.blogs.map((blog: BlogSchema) => (
          <div
            className="flex flex-col items-center justify-center gap-2 p-2 m-2 rounded-lg bg-slate-800"
            key={blog._id.toString()}
          >
            <h2 className="font-bold text-white text-lg uppercase">
              {blog?.title}
            </h2>
            <div className="p-2 text-center">
              <p className="text-white text-sm">{blog?.body}</p>
            </div>
            <TrashIcon
              onClick={() => handleTrashClick(blog)}
              className="text-white w-15 h-15 hover:cursor-pointer"
            />
          </div>
        ))}
    </div>
  );
}

export default Blogs;
