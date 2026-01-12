interface CheckIndicatorProps {
  color: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function CheckIndicator({ color, size = 'md', className = '' }: CheckIndicatorProps) {
  const sizeClasses = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const iconSize = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3';

  return (
    <div
      className={`rounded-full flex items-center justify-center ${sizeClasses} ${className}`}
      style={{ backgroundColor: color }}
    >
      <svg
        className={`${iconSize} text-white`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}
