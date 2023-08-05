import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { BlogSchema } from "../../../../server/src/models/Blogs";
import useDeleteBlog from "@/hooks/useDeleteBlog";
import moment from "moment";
import { Link } from "react-router-dom";

function Blog({ blog }: { blog: BlogSchema }) {
  const { mutate } = useDeleteBlog();

  function handleTrashClick(blog: BlogSchema) {
    mutate(blog);
  }

  return (
    <Link to={`/home/${blog._id.toString().slice(0, 4)}`}>
      <div
        className="hover:-translate-y-1 transition-transform cursor-pointer flex flex-col items-center justify-center gap-2 p-2 m-2 rounded-lg border border-slate-400 bg-slate-800"
        key={blog._id.toString()}
      >
        <h2 className="whitespace-pre-line text-center font-bold text-white text-lg">
          {blog?.title.replace(/\b\w/g, (val) => val.toUpperCase())}
        </h2>
        <div className="p-2 text-center">
          <p className=" text-white text-sm">{blog?.body}</p>
          <p className="text-white text-xs mt-2 font-bold">
            Added {moment(blog.createdAt).fromNow()}
          </p>
          <p className="text-white text-xs mt-2 font-bold">
            Created at {blog.createdAt.toString().split("T")[0]}
          </p>
        </div>
        <div className="bg-red-500 text-center text-lg w-max px-3 py-1 rounded">
          <FontAwesomeIcon
            icon={faSquareMinus}
            onClick={() => handleTrashClick(blog)}
            className="text-white hover:cursor-pointer"
          />
        </div>
      </div>
    </Link>
  );
}

export default Blog;
