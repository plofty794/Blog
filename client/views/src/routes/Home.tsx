import { Button } from "@/components/ui/button";
import Blogs from "@/partials/Blogs";
import Form from "@/partials/Form";
import { useUserStore } from "@/store/userStore";
import { Link } from "react-router-dom";

function Home() {
  const logOut = useUserStore((state) => state.setLogOut);

  function handleLogout() {
    logOut();
  }

  return (
    <>
      <div>
        <nav className="px-8 py-3 bg-slate-950 border-b border-slate-700">
          <ul className="text-slate-200 font-semibold w-full flex justify-end items-center">
            <Button onClick={handleLogout}>Log out</Button>
          </ul>
        </nav>
        <section className="min-h-screen p-4 flex flex-col items-center bg-slate-950">
          <Form />
          <Blogs />
        </section>
      </div>
    </>
  );
}

export default Home;
