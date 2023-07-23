/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateBlog from "@/hooks/useCreateBlog";
import { Toaster } from "@/components/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BlogSchema, schema } from "@/zod schema/zodSchema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Form() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    resetField,
  } = useForm<BlogSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const { mutate } = useCreateBlog();

  function handleFormSubmit(data: BlogSchema) {
    mutate(data);
    resetField("title", { defaultValue: "", keepError: false });
    resetField("body", { defaultValue: "", keepError: false });
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-max mx-auto" variant="destructive">
            Add Blog
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white font-bold">Add Blog</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col justify-center items-center p-4"
          >
            <div className="container mx-auto">
              <Label
                className="block text-white text-lg font-bold"
                htmlFor="title"
              >
                Title
              </Label>
              <Input
                className="bg-slate-800 text-white text-sm"
                {...register("title")}
                id="title"
                placeholder="Add blog title here"
              />
              {errors.title && (
                <div className="bg-yellow-200 text-red-600 text-xs p-1 font-bold rounded border w-max mt-2">
                  <span>{errors.title.message}</span>
                </div>
              )}
            </div>
            <div className="container mx-auto">
              <Label
                className="block text-white text-lg  font-bold"
                htmlFor="body"
              >
                Body
              </Label>
              <Textarea
                className="text-white"
                {...register("body")}
                id="body"
                placeholder="Add blog content here"
              />
              {errors.body && (
                <div className="bg-yellow-200 text-red-600 text-xs p-1 font-bold rounded border w-max mt-2">
                  <span>{errors.body.message}</span>
                </div>
              )}
            </div>
            <Button className="m-4 w-max">Create Blog</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
}

export default Form;
