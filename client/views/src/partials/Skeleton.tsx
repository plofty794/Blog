import { Skeleton } from "@/components/ui/skeleton";

function SkeletonLoader() {
  return (
    <div className="flex items-center space-x-">
      <Skeleton className="h-12 w-12 rounded-full bg-slate-500" />
      <div className="ml-4 space-y-2">
        <Skeleton className="h-4 w-[250px] bg-slate-500" />
        <Skeleton className="h-4 w-[200px] bg-slate-500" />
      </div>
    </div>
  );
}

export default SkeletonLoader;
