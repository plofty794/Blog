import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Lottie from "lottie-react";
import lottieAnimation from "../lotties/Animation - 1690254112131.json";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, zodSignupSchema } from "../zod schema/zodSchema";
import useSignup from "@/hooks/useSignup";
import { Toaster } from "@/components/ui/toaster";

import ErrorMessage from "@/partials/ErrorMessage";
import { Link } from "react-router-dom";

function Signup() {
  const { mutate } = useSignup();

  const {
    handleSubmit,
    formState: { errors },
    resetField,
    register,
  } = useForm<SignupSchema>({
    resolver: zodResolver(zodSignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function handleSignup(data: SignupSchema) {
    const { username, email, password, confirmPassword } = data;
    mutate({ username, email, password, confirmPassword });
    resetField("username", { defaultValue: "", keepError: false });
    resetField("email", { defaultValue: "", keepError: false });
    resetField("password", { defaultValue: "", keepError: false });
    resetField("confirmPassword", { defaultValue: "", keepError: false });
  }

  return (
    <main className="min-h-screen p-4 flex justify-center items-center bg-slate-950">
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
            <h1 className="text-3xl font-bold">Welcome to</h1>
            <h2 className="text-2xl font-bold text-blue-500">Blogtainement.</h2>
          </div>
          <form
            onSubmit={handleSubmit(handleSignup)}
            className="my-4 flex flex-col justify-center gap-2  "
          >
            <h3 className="text-gray-600 text-xl font-bold">Sign up</h3>
            <Input
              {...register("username")}
              className="border-black"
              placeholder="Username"
            />
            {errors.username && (
              <ErrorMessage message={errors.username.message} />
            )}
            <Input
              {...register("email")}
              className="border-black"
              placeholder="Email"
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
            <Input
              {...register("password")}
              className="border-black"
              placeholder="Password"
              type="password"
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
            <Input
              {...register("confirmPassword")}
              className="border-black"
              placeholder="Confirm password"
              type="password"
            />
            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword.message} />
            )}
            <Button variant={"default"}>Sign up</Button>
          </form>
          <span className="text-xs font-semibold text-center">
            Already have an account?{" "}
            <Link className="text-blue-600 underline" to={"/signin"}>
              {" "}
              Sign in
            </Link>
          </span>
        </div>
        <Toaster />
      </section>
    </main>
  );
}

export default Signup;
