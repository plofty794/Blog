import { useInfiniteQuery } from "@tanstack/react-query";
import { BlogSchema } from "../../../../server/src/models/Blogs";
import { useAccessTokenStore } from "@/store/accessTokenStore";
import useAxiosPrivate from "./useAxiosPrivate";

function useGetBlogs() {
  const axiosPrivate = useAxiosPrivate();
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  async function fetchBlogs(pageParam: number): Promise<BlogSchema[]> {
    const { data } = await axiosPrivate.get(`/api/blogs/page/${pageParam}`);
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
    enabled: accessToken != null,
  });
}

export default useGetBlogs;
