import { TrashIcon } from "@radix-ui/react-icons";
import { BlogSchema } from "../../../../server/src/models/Blogs";
import useDeleteBlog from "@/hooks/useDeleteBlog";

function Blog({ blog }: { blog: BlogSchema }) {
  const { mutate } = useDeleteBlog();

  function handleTrashClick(blog: BlogSchema) {
    mutate(blog);
  }

  return (
    <div
      className="flex flex-col items-center justify-center gap-2 p-2 m-2 rounded-lg bg-slate-800"
      key={blog._id.toString()}
    >
      <h2 className="font-bold text-white text-lg uppercase">{blog?.title}</h2>
      <div className="p-2 text-center">
        <p className="text-white text-sm">{blog?.body}</p>
      </div>
      <TrashIcon
        onClick={() => handleTrashClick(blog)}
        className="text-white w-15 h-15 hover:cursor-pointer"
      />
    </div>
  );
}

export default Blog;
