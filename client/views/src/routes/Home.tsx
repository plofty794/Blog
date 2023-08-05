import Blogs from "@/partials/Blogs";
import Form from "@/partials/Form";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <nav className="px-8 py-3 bg-slate-950 border-b border-slate-700">
        <ul className="text-slate-200 font-semibold w-full flex justify-between items-center">
          <div className="w-28 flex justify-between">
            <Link to={"/home"}>Home</Link>
            <Link to={"/signup"}>About</Link>
          </div>
          <Link to={"/signin"}>Log out</Link>
        </ul>
      </nav>
      <section className="min-h-screen p-4 flex flex-col items-center bg-slate-950">
        <Form />
        <Blogs />
      </section>
    </div>
  );
}

export default Home;
