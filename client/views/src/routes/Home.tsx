import Blogs from "@/partials/Blogs";
import Form from "@/partials/components/Form";

function Home() {
  return (
    <>
      <section className="p-4 flex flex-col items-center bg-slate-900">
        <Form />
        <Blogs />
      </section>
    </>
  );
}

export default Home;
