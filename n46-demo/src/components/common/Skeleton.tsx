interface SkeletonProps {
  className?: string;
  variant?: 'rectangle' | 'circle' | 'text';
}

export function Skeleton({ className = '', variant = 'rectangle' }: SkeletonProps) {
  const baseClasses = 'animate-shimmer bg-n46-gray-100';

  const variantClasses = {
    rectangle: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded h-4',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-n46-gray-100 overflow-hidden">
      <Skeleton className="h-32 rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="flex gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-n46-gray-100">
          <Skeleton className="w-10 h-10" variant="circle" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-8" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function GridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
