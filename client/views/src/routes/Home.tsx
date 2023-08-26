import Blogs from "@/partials/Blogs";
import Form from "@/partials/Form";

function Home() {
  return (
    <>
      <section className="p-4 flex flex-col items-center bg-slate-950">
        <Form />
        <Blogs />
      </section>
    </>
  );
}

export default Home;
