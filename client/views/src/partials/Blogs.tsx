import { BlogSchema } from "@../../../../server/src/models/Blogs";
import Blog from "./Blog";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import useGetBlogs from "@/hooks/useGetBlogs";
import { Badge } from "@/components/ui/badge";

function Blogs() {
  const { data, fetchNextPage, isFetchingNextPage, isError } = useGetBlogs();
  const TOTAL_BLOGS = data?.pages.flat().length;

  return (
    <>
      <Badge
        variant={"secondary"}
        className="text-center mt-2 bg-slate-700 text-white hover:bg-slate-800"
      >
        Blog Count: {TOTAL_BLOGS}
      </Badge>
      <div className="m-6 grid lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 w-4/5">
        {data &&
          data.pages.map((page) =>
            page.map((blog: BlogSchema) => (
              <Blog blog={blog} key={blog._id.toString()} />
            ))
          )}
      </div>
      <div className="flex p-1">
        <Button
          onClick={() => fetchNextPage()}
          variant={"destructive"}
          disabled={isFetchingNextPage || isError}
        >
          {isFetchingNextPage ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          ) : isError || !data?.pages.length ? (
            "No blogs to load"
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </>
  );
}

export default Blogs;
