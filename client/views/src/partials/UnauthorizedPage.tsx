import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import lottieErrorPage from "../lotties/animation_ll0pc6fz.json";
import { Button } from "@/components/ui/button";

function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="flex items-center">
        <div className="p-2">
          <Lottie animationData={lottieErrorPage} className="w-52" />
        </div>
        <div className="h-20 border-l border-white p-6">
          <span className="text-sm font-light">
            Unauthorized. Page not accessible.
          </span>
        </div>
      </div>
      <div className="py-6 text-center ">
        <Button
          variant={"ghost"}
          className=" text-white text-xs font-normal p-2 hover:bg-slate-900 hover:text-white"
        >
          <Link to={"/signin"}>Click here to proceed.</Link>
        </Button>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
