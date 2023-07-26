import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Lottie from "lottie-react";
import lottieAnimation from "../lotties/Animation - 1690254112131.json";

function Signin() {
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
            <h1 className="text-3xl font-bold">Dive head first into</h1>
            <h2 className="text-2xl font-bold text-blue-500">
              Blog Management.
            </h2>
          </div>
          <form className="my-4 flex flex-col justify-center gap-2  ">
            <h3 className="text-gray-600 text-xl font-bold">Sign in</h3>
            <Input className="border-black" placeholder="Email" />
            <Input
              className="border-black"
              placeholder="Password"
              type="password"
            />
            <Button variant={"default"}>Sign in</Button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Signin;
