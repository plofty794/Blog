import { axiosRoute } from "./api/axios";
import Blogs from "./partials/Blogs";
import Form from "./partials/Form";

async function getBlogs() {
  const { data } = await axiosRoute.get("/api/blogs");
  console.log(data);
}

function App() {
  getBlogs();

  return (
    <main className="min-h-screen p-4 flex flex-col items-center bg-slate-900">
      <Form />
      <Blogs />
    </main>
  );
}

export default App;
