import { PresentationCard } from './PresentationCard';
import type { Presentation } from '../../types';

interface PresentationGridProps {
  presentations: Presentation[];
  onDelete: (id: number) => void;
  onUpdateThumbnail?: (id: number, thumbnailUrl: string) => void;
}

export function PresentationGrid({ presentations, onDelete, onUpdateThumbnail }: PresentationGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {presentations.map((presentation, index) => (
        <div
          key={presentation.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
        >
          <PresentationCard
            presentation={presentation}
            onDelete={onDelete}
            onUpdateThumbnail={onUpdateThumbnail}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}
