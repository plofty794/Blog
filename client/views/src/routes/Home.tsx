import Blogs from "@/partials/Blogs";
import Form from "@/partials/Form";
import { axiosRoute } from "../api/axios";

async function getBlogs() {
  const { data } = await axiosRoute.get("/api/blogs");
  console.log(data);
}

function Home() {
  getBlogs();

  return (
    <main className="min-h-screen p-4 flex flex-col items-center bg-slate-900">
      <Form />
      <Blogs />
    </main>
  );
}

export default Home;
