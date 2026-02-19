import { Skeleton } from '@/components/ui/skeleton';

export default function MovieRowSkeleton() {
  return (
    <div className="space-y-4 px-8 md:px-16 py-8">
      <Skeleton className="h-8 w-48 bg-gray-700" />
      <div className="flex gap-4 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <Skeleton
            key={i}
            className="flex-shrink-0 w-[200px] h-[300px] rounded-md bg-gray-700"
          />
        ))}
      </div>
    </div>
  );
}
