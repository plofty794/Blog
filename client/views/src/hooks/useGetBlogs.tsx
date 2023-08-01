import { axiosRoute } from "@/api/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BlogSchema } from "../../../../server/src/models/Blogs";

function useGetBlogs() {
  async function fetchBlogs(pageParam: number): Promise<BlogSchema[]> {
    const { data } = await axiosRoute.get(`/api/blogs/page/${pageParam}`);
    return data.blogs;
  }

  return useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: ({ pageParam = 1 }) => fetchBlogs(pageParam),
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export default useGetBlogs;
