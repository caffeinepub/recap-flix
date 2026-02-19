import { Skeleton } from '@/components/ui/skeleton';

export default function HeroSkeleton() {
  return (
    <div className="relative h-[80vh] w-full">
      {/* Background skeleton */}
      <Skeleton className="absolute inset-0 w-full h-full" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent" />
      
      {/* Content skeleton */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 space-y-4">
        <Skeleton className="h-12 w-3/4 md:w-1/2 bg-gray-700" />
        <Skeleton className="h-6 w-full md:w-2/3 bg-gray-700" />
        <Skeleton className="h-6 w-5/6 md:w-1/2 bg-gray-700" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-12 w-32 bg-gray-700" />
          <Skeleton className="h-12 w-32 bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
