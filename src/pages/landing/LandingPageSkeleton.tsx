import { Skeleton } from "@/components/ui/skeleton";

export const LandingPageSkeleton = () => {
  return (
    <div className="-m-4 min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-20 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
        <Skeleton className="h-8 w-56 rounded-full" />
        <Skeleton className="h-12 w-full max-w-2xl" />
        <Skeleton className="h-12 w-full max-w-xl" />
        <Skeleton className="h-5 w-full max-w-lg" />
        <div className="mt-4 flex gap-3">
          <Skeleton className="h-11 w-36" />
          <Skeleton className="h-11 w-28" />
        </div>
      </div>
    </div>
  );
};
