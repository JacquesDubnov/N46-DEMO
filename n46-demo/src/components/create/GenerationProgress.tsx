import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw, Check } from 'lucide-react';
import { ConfirmModal } from '../common/Modal';
import type { GenerationProgress as GenerationProgressType } from '../../hooks/useGamma';

interface GenerationProgressProps {
  progress: GenerationProgressType;
  presentationId: number | null;
  numSlides?: number;
  theme?: string;
  profile?: string;
  onCancel: () => void;
  onRetry: () => void;
}

// Dynamic status messages that rotate during generation
const STATUS_MESSAGES = [
  'Analyzing your content...',
  'Creating slide {n} of {total}...',
  'Researching latest data...',
  'Generating visuals...',
  'Crafting key insights...',
  'Optimizing layout for {profile}...',
  'Applying {theme} theme...',
  'Enhancing visual hierarchy...',
  'Validating information accuracy...',
  'Formatting content structure...',
  'Selecting relevant images...',
  'Balancing text density...',
  'Refining slide transitions...',
  'Adding professional touches...',
  'Polishing final details...',
];

// Simulated content lines for the scrolling text window
const PLACEHOLDER_LINES = [
  'Analyzing market dynamics and competitive landscape...',
  'The implementation strategy focuses on three key areas...',
  'Research indicates a 47% increase in adoption rates...',
  'Key stakeholders should consider the following factors...',
  'Data visualization enhances comprehension by 65%...',
  'Strategic alignment requires cross-functional collaboration...',
  'Industry benchmarks suggest optimal performance at...',
  'The projected ROI demonstrates significant potential...',
  'Executive summary highlights critical success factors...',
  'Competitive analysis reveals market opportunities in...',
  'Technology integration enables seamless workflows...',
  'Customer insights drive product development priorities...',
  'Financial projections indicate steady growth trajectory...',
  'Risk mitigation strategies include diversification...',
  'Performance metrics track key business objectives...',
  'Innovation pipeline supports long-term sustainability...',
  'Market segmentation identifies target demographics...',
  'Value proposition differentiates from competitors...',
  'Operational efficiency improves bottom-line results...',
  'Strategic partnerships expand market reach globally...',
];

export function GenerationProgress({
  progress,
  presentationId,
  numSlides = 10,
  theme = 'Mercury',
  profile = 'business',
  onCancel,
  onRetry,
}: GenerationProgressProps) {
  const navigate = useNavigate();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [completedSlides, setCompletedSlides] = useState(0);
  const [currentBuildingSlide, setCurrentBuildingSlide] = useState(0);
  const [scrollingLines, setScrollingLines] = useState<string[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef(Date.now());

  // Format elapsed time as HH:MM:SS
  function formatElapsedTime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Timer for elapsed time - stops when completed
  useEffect(() => {
    if (progress.state === 'completed' || progress.state === 'failed') return;
    if (progress.state !== 'generating' && progress.state !== 'starting') return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [progress.state]);

  // Rotate status messages every 2.5 seconds
  useEffect(() => {
    if (progress.state !== 'generating' && progress.state !== 'starting') return;

    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [progress.state]);

  // Update completed slides based on progress
  useEffect(() => {
    // When completed, mark all slides as done
    if (progress.state === 'completed') {
      setCompletedSlides(numSlides);
      setCurrentBuildingSlide(-1); // No slide is building
      return;
    }

    if (progress.state !== 'generating' && progress.state !== 'starting') return;

    const progressPercent = progress.progress || 0;
    const completed = Math.floor((progressPercent / 100) * numSlides);
    // Allow completedSlides to reach numSlides when at 100%, otherwise cap at numSlides-1
    setCompletedSlides(progressPercent >= 100 ? numSlides : Math.min(completed, numSlides - 1));
    setCurrentBuildingSlide(Math.min(completed, numSlides - 1));
  }, [progress.progress, numSlides, progress.state]);

  // Add scrolling text lines rapidly for visual effect
  useEffect(() => {
    if (progress.state !== 'generating' && progress.state !== 'starting') return;

    const interval = setInterval(() => {
      setScrollingLines((prev) => {
        const newLine = PLACEHOLDER_LINES[Math.floor(Math.random() * PLACEHOLDER_LINES.length)];
        const updated = [...prev, newLine].slice(-8); // Keep last 8 lines
        return updated;
      });
    }, 400); // Fast text generation feel

    return () => clearInterval(interval);
  }, [progress.state]);

  // Auto-scroll the text container
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [scrollingLines]);

  // Format status message with dynamic values
  function formatStatusMessage(message: string): string {
    return message
      .replace('{n}', String(currentBuildingSlide + 1))
      .replace('{total}', String(numSlides))
      .replace('{profile}', profile)
      .replace('{theme}', theme);
  }

  function handleCancelClick() {
    setShowCancelConfirm(true);
  }

  function handleConfirmCancel() {
    setShowCancelConfirm(false);
    onCancel();
  }

  // Calculate estimated time remaining
  function getEstimatedTime(): string {
    const progressPercent = progress.progress || 0;
    if (progressPercent < 10) return '~45 seconds';
    if (progressPercent < 30) return '~35 seconds';
    if (progressPercent < 50) return '~25 seconds';
    if (progressPercent < 70) return '~15 seconds';
    if (progressPercent < 90) return '~8 seconds';
    return 'Almost done...';
  }

  function renderGeneratingState() {
    return (
      <>
        {/* Digital Clock - at the top */}
        <div className="mb-8">
          <div className="text-6xl font-mono font-bold text-n46-gray-700 tabular-nums tracking-wider">
            {formatElapsedTime(elapsedTime)}
          </div>
          <p className="text-sm text-n46-gray-500 mt-2">Elapsed time</p>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-n46-gray-800 mb-1">
            Creating your presentation
          </h2>
          <p className="text-sm text-n46-gray-500">
            Please wait while we build your slides
          </p>
        </div>

        {/* Dynamic Status Line - Enlarged by 300% */}
        <div className="w-full max-w-2xl mb-8">
          <div className="flex items-center gap-3 justify-center">
            <div className="w-4 h-4 rounded-full bg-n46-blue animate-pulse" />
            <p className="text-3xl font-medium text-n46-gray-700 transition-all duration-300">
              {formatStatusMessage(STATUS_MESSAGES[statusIndex])}
            </p>
          </div>
        </div>

        {/* Mini Slide Thumbnails */}
        <div className="w-full max-w-lg mb-6">
          <div className="bg-white rounded-xl p-3 border border-n46-gray-200 shadow-sm">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {Array.from({ length: numSlides }).map((_, index) => {
                const isCompleted = index < completedSlides;
                const isBuilding = index === currentBuildingSlide;

                return (
                  <div
                    key={index}
                    className={`
                      flex-shrink-0 w-8 h-5 rounded-sm flex items-center justify-center
                      text-[8px] font-medium transition-all duration-300
                      ${isCompleted
                        ? 'bg-green-500 text-white'
                        : isBuilding
                          ? 'bg-n46-blue text-white animate-pulse'
                          : 'bg-n46-gray-200 text-n46-gray-500'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      index + 1
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scrolling Text Window - White background with dark grey text */}
        <div className="w-full max-w-lg mb-6">
          <div className="relative bg-white rounded-xl overflow-hidden border border-n46-gray-200 shadow-sm">
            {/* Fade overlay top */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />

            {/* Scrolling content */}
            <div
              ref={scrollContainerRef}
              className="h-20 overflow-hidden px-4 py-3 font-mono text-[10px] text-n46-gray-600 leading-relaxed"
            >
              {scrollingLines.map((line, index) => (
                <div
                  key={index}
                  className="animate-fade-in truncate"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-n46-gray-400">{'>'}</span> {line}
                </div>
              ))}
              <div className="text-n46-gray-700 animate-pulse">
                <span className="text-n46-gray-400">{'>'}</span> █
              </div>
            </div>

            {/* Fade overlay bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-lg mb-3">
          <div className="h-2 bg-n46-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-n46-blue to-blue-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress.progress || 0}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-n46-gray-500">
              {getEstimatedTime()}
            </span>
            <span className="text-sm font-medium text-n46-gray-700">
              {Math.round(progress.progress || 0)}%
            </span>
          </div>
        </div>

        {/* Cancel Button */}
        <button
          onClick={handleCancelClick}
          className="mt-6 px-6 py-2.5 rounded-lg text-sm font-medium text-n46-gray-600 hover:bg-n46-gray-100 transition-colors border border-n46-gray-200"
        >
          Cancel
        </button>
      </>
    );
  }

  function renderCompletedInlineState() {
    return (
      <>
        {/* Digital Clock - frozen at completion time */}
        <div className="mb-8">
          <div className="text-6xl font-mono font-bold text-green-600 tabular-nums tracking-wider">
            {formatElapsedTime(elapsedTime)}
          </div>
          <p className="text-sm text-green-500 mt-2">Completed!</p>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-n46-gray-800 mb-1">
            Presentation created successfully
          </h2>
          <p className="text-sm text-n46-gray-500">
            All slides have been generated
          </p>
        </div>

        {/* Mini Slide Thumbnails - all green checkmarks */}
        <div className="w-full max-w-lg mb-6">
          <div className="bg-white rounded-xl p-3 border border-n46-gray-200 shadow-sm">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {Array.from({ length: numSlides }).map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-8 h-5 rounded-sm flex items-center justify-center text-[8px] font-medium bg-green-500 text-white"
                >
                  <Check className="w-3 h-3" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling Text Window - final state */}
        <div className="w-full max-w-lg mb-6">
          <div className="relative bg-white rounded-xl overflow-hidden border border-n46-gray-200 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
            <div className="h-20 overflow-hidden px-4 py-3 font-mono text-[10px] text-n46-gray-600 leading-relaxed">
              {scrollingLines.slice(-6).map((line, index) => (
                <div key={index} className="truncate">
                  <span className="text-n46-gray-400">{'>'}</span> {line}
                </div>
              ))}
              <div className="text-green-600 font-medium">
                <span className="text-green-400">{'>'}</span> Generation complete ✓
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
          </div>
        </div>

        {/* Progress Bar - full */}
        <div className="w-full max-w-lg mb-3">
          <div className="h-2 bg-n46-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full w-full" />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-green-500">
              Done!
            </span>
            <span className="text-sm font-medium text-green-600">
              100%
            </span>
          </div>
        </div>

        {/* Go To Presentation Button */}
        <button
          onClick={() => presentationId && navigate(`/presentation/${presentationId}`)}
          className="mt-6 px-8 py-3 rounded-xl text-base font-semibold bg-n46-blue text-white hover:bg-n46-blue-light transition-colors shadow-lg shadow-n46-blue/25"
        >
          Go To Presentation
        </button>
      </>
    );
  }

  function renderFailedState() {
    return (
      <>
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-xl font-semibold text-n46-black mb-2">
          Generation failed
        </h2>
        <p className="text-n46-gray-600 mb-2">
          Something went wrong while creating your presentation
        </p>
        {progress.error && (
          <p className="text-sm text-red-500 mb-6 max-w-md">
            {progress.error}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-n46-gray-600 hover:bg-n46-gray-100 transition-colors"
          >
            Back to Dashboard
          </button>
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium bg-n46-blue text-white hover:bg-n46-blue-light transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </>
    );
  }

  function renderContent() {
    switch (progress.state) {
      case 'starting':
      case 'generating':
        return renderGeneratingState();
      case 'completed':
        return renderCompletedInlineState();
      case 'failed':
        return renderFailedState();
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      {renderContent()}

      {/* Cancel Confirmation Modal */}
      <ConfirmModal
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel generation?"
        message="Are you sure you want to cancel? Your presentation is still being generated and will not be saved."
        confirmLabel="Cancel Generation"
        cancelLabel="Keep Waiting"
        variant="danger"
      />
    </div>
  );
}
