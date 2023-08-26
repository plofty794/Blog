import { Button, buttonVariants } from "@/components/ui/button";
import TipTapEditor from "@/partials/TipTapEditor";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function BlogDetails() {
  const { handleSubmit, control } = useForm();

  function formSubmit(data: FieldValues) {
    console.log(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)}>
        <TipTapEditor control={control} name="title" />
        <TipTapEditor control={control} name="body" />
        <Button variant={"destructive"} type="submit">
          Submit
        </Button>
        <Link
          to={"/home"}
          className={buttonVariants({
            variant: "destructive",
            className: "hover:bg-slate-700 hover:text-white",
          })}
        >
          Back
        </Link>
      </form>
    </>
  );
}
export default BlogDetails;
