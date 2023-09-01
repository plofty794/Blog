import { Button, buttonVariants } from "@/components/ui/button";
import { Suspense, lazy } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogSchema, zodBlogSchema } from "@/zod schema/zodSchema";

const TipTapEditor = lazy(() => import("@/partials/components/TipTapEditor"));

function BlogDetails() {
  const { handleSubmit, control } = useForm<BlogSchema>({
    resolver: zodResolver(zodBlogSchema),
  });

  function formSubmit(data: FieldValues) {
    console.log(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)}>
        <Suspense
          fallback={
            <ReloadIcon className="animate-spin text-white h-11 w-11 mx-auto" />
          }
        >
          <TipTapEditor control={control} name="title" />
          <TipTapEditor control={control} name="body" />
        </Suspense>
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
