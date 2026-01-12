import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Trash2, Loader2, Layers } from 'lucide-react';
import type { Presentation, UserProfile } from '../../types';
import { buildThumbnailPrompt, generateThumbnail, checkSDAvailability } from '../../utils/thumbnailGenerator';

const PROFILE_COLORS: Record<UserProfile, { bg: string; text: string; gradient: string }> = {
  student: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    gradient: 'from-purple-400 to-purple-600',
  },
  business: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    gradient: 'from-blue-400 to-blue-600',
  },
  social: {
    bg: 'bg-pink-100',
    text: 'text-pink-700',
    gradient: 'from-pink-400 to-pink-600',
  },
  scientific: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    gradient: 'from-emerald-400 to-emerald-600',
  },
};

const PROFILE_LABELS: Record<UserProfile, string> = {
  student: 'Student',
  business: 'Business',
  social: 'Social',
  scientific: 'Scientific',
};

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  draft: { bg: 'bg-n46-gray-100', text: 'text-n46-gray-600' },
  generating: { bg: 'bg-amber-100', text: 'text-amber-700' },
  completed: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  failed: { bg: 'bg-red-100', text: 'text-red-700' },
};

interface PresentationCardProps {
  presentation: Presentation;
  onDelete: (id: number) => void;
  onUpdateThumbnail?: (id: number, thumbnailUrl: string) => void;
  index: number;
}

export function PresentationCard({ presentation, onDelete, onUpdateThumbnail, index }: PresentationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(presentation.thumbnailUrl);

  // Check SD availability and auto-generate thumbnail if needed
  useEffect(() => {
    // Only try to generate for completed presentations without thumbnails
    if (presentation.thumbnailUrl || presentation.status !== 'completed' || thumbnailUrl) return;

    let cancelled = false;
    let retryTimeout: NodeJS.Timeout;

    async function tryGenerateThumbnail(retryCount = 0) {
      if (cancelled) return;

      const available = await checkSDAvailability();
      if (cancelled) return;

      if (available) {
        autoGenerateThumbnail();
      } else if (retryCount < 3) {
        // Retry up to 3 times with increasing delays
        retryTimeout = setTimeout(() => tryGenerateThumbnail(retryCount + 1), 2000 * (retryCount + 1));
      }
    }

    tryGenerateThumbnail();

    return () => {
      cancelled = true;
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [presentation.id, presentation.status, presentation.thumbnailUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  async function autoGenerateThumbnail() {
    if (isGeneratingThumbnail || thumbnailUrl) return;

    setIsGeneratingThumbnail(true);
    const prompt = buildThumbnailPrompt(presentation.title, presentation.userProfile, presentation.useCase);
    const result = await generateThumbnail(prompt, `thumbnail-${presentation.id}`);

    if (result.success && result.path) {
      setThumbnailUrl(result.path);
      if (presentation.id && onUpdateThumbnail) {
        onUpdateThumbnail(presentation.id, result.path);
      }
    }
    setIsGeneratingThumbnail(false);
  }

  const profileColor = PROFILE_COLORS[presentation.userProfile];
  const statusStyle = STATUS_STYLES[presentation.status] || STATUS_STYLES.draft;

  const formattedDate = new Date(presentation.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const statusLabel = presentation.status.charAt(0).toUpperCase() + presentation.status.slice(1);

  return (
    <div
      className="group relative bg-white rounded-xl border border-n46-gray-100 overflow-hidden transition-all duration-200 hover:border-n46-gray-200 hover:shadow-lg"
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail / Slide Preview */}
      <div className="h-32 relative">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={presentation.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${profileColor.gradient} flex items-center justify-center`}>
            {presentation.status === 'generating' ? (
              <div className="text-center text-white">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 opacity-80" />
                <p className="text-xs opacity-80">Generating...</p>
              </div>
            ) : isGeneratingThumbnail ? (
              <div className="text-center text-white">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 opacity-80" />
                <p className="text-xs opacity-80">Creating thumbnail...</p>
              </div>
            ) : (
              <Layers className="w-10 h-10 text-white opacity-50" />
            )}
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
            {presentation.status === 'generating' && (
              <Loader2 className="w-3 h-3 animate-spin" />
            )}
            {statusLabel}
          </span>
        </div>

        {/* Hover Actions Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-200 z-20 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Link
            to={`/presentation/${presentation.id}`}
            className="p-2 bg-white rounded-lg text-n46-gray-700 hover:text-n46-blue transition-colors"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (presentation.id) onDelete(presentation.id);
            }}
            className="p-2 bg-white rounded-lg text-n46-gray-700 hover:text-n46-error transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Profile Badge */}
        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${profileColor.bg} ${profileColor.text} mb-2`}>
          {PROFILE_LABELS[presentation.userProfile]}
        </span>

        {/* Title */}
        <h3 className="text-sm font-medium text-n46-gray-900 truncate mb-1">
          {presentation.title}
        </h3>

        {/* Date */}
        <p className="text-xs text-n46-gray-400">
          {formattedDate}
        </p>
      </div>
    </div>
  );
}
