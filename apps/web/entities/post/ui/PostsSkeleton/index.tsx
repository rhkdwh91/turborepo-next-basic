import { Skeleton } from "@ui/src/components/atom/Skeleton";

export default function PostsSkeleton() {
  return (
    <>
      <Skeleton className="h-[271px] w-[250px] rounded-xl" />
      <Skeleton className="h-[271px] w-[400px] rounded-xl" />
      <Skeleton className="h-[271px] w-[300px] rounded-xl" />
      <Skeleton className="h-[271px] w-[250px] rounded-xl" />
      <Skeleton className="h-[271px] w-[320px] rounded-xl" />
      <Skeleton className="h-[271px] w-[200px] rounded-xl" />
    </>
  );
}
