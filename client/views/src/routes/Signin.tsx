import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Lottie from "lottie-react";
import lottieAnimation from "../lotties/Animation - 1690254112131.json";
import { Toaster } from "@/components/ui/toaster";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema, zodSigninSchema } from "@/zod schema/zodSchema";
import ErrorMessage from "@/partials/ErrorMessage";
import { Link, Navigate } from "react-router-dom";
import useSignin from "@/hooks/useSignin";

function Signin() {
  const { mutate, isSuccess } = useSignin();
  const {
    handleSubmit,
    formState: { errors },
    register,
    resetField,
  } = useForm<SigninSchema>({
    resolver: zodResolver(zodSigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSignin(data: SigninSchema) {
    mutate(data);
    resetField("email", { defaultValue: "", keepError: false });
    resetField("password", { defaultValue: "", keepError: false });
  }

  return (
    <>
      <main className="flex justify-center items-center bg-slate-950">
        <section className="w-2/3 p-3 grid grid-cols-2 items-center gap-3 rounded-lg bg-white">
          <div>
            <Lottie
              animationData={lottieAnimation}
              autoplay={true}
              className="rounded"
            />
          </div>
          <div className="p-6 h-full flex flex-col justify-center">
            <div>
              <h1 className="text-3xl font-bold">Dive head first into</h1>
              <h2 className="text-2xl font-bold text-blue-500">
                Blog Management.
              </h2>
            </div>
            <form
              onSubmit={handleSubmit(handleSignin)}
              className="my-4 flex flex-col justify-center gap-2  "
            >
              <h3 className="text-gray-600 text-xl font-bold">Sign in</h3>
              <Input
                className="border-black"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
              <Input
                className="border-black"
                placeholder="Password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <ErrorMessage message={errors.password.message} />
              )}
              <Button variant={"default"}>Sign in</Button>
            </form>
            <span className="text-xs font-semibold text-center">
              Don't have an account?{" "}
              <Link className="text-blue-600 underline" to={"/signup"}>
                {" "}
                Sign up
              </Link>
            </span>
          </div>
          <Toaster />
        </section>
      </main>
      {isSuccess && <Navigate to={"/home"} />}
    </>
  );
}

export default Signin;
