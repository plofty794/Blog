import { buttonVariants } from "@/components/ui/button";
import Blogs from "@/partials/Blogs";
import Form from "@/partials/Form";
import { useAccessTokenStore } from "@/store/accessTokenStore";
import { useUserStore } from "@/store/userStore";
import { Navigate } from "react-router-dom";

function Home() {
  const user = useUserStore((state) => state.user);

  return (
    <>
      {!user && <Navigate replace to={"/unauthorized"} />}

      <section className="min-h-screen p-4 flex flex-col items-center bg-slate-950">
        <Form />
        <Blogs />
      </section>
    </>
  );
}

export default Home;
