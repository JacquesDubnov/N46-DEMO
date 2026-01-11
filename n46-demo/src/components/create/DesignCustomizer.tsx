import { useState } from 'react';
import { Sparkles, ChevronDown, Minus, Plus, FileText, LayoutGrid, Camera, Pencil, Shapes, Box, PenLine, Loader2 } from 'lucide-react';
import type { ImageStyle } from '../../types';
import type { SlideDimensions } from '../../utils/profileOptimizer';
import type { GammaTheme } from '../../api/gamma';

interface DesignCustomizerProps {
  density: number;
  numSlides: number;
  themeId: string | null;
  imageStyle: ImageStyle;
  slideDimensions: SlideDimensions;
  themes: GammaTheme[];
  isLoadingThemes?: boolean;
  onDensityChange: (density: number) => void;
  onNumSlidesChange: (numSlides: number) => void;
  onThemeChange: (themeId: string | null) => void;
  onImageStyleChange: (imageStyle: ImageStyle) => void;
  onSlideDimensionsChange: (dimensions: SlideDimensions) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
}

// Image style options with preview graphics
const IMAGE_STYLES: { id: ImageStyle; name: string; icon: typeof Camera; description: string }[] = [
  { id: 'photo', name: 'Photo', icon: Camera, description: 'Realistic photography' },
  { id: 'illustration', name: 'Illustration', icon: Pencil, description: 'Hand-drawn style' },
  { id: 'abstract', name: 'Abstract', icon: Shapes, description: 'Geometric & modern' },
  { id: '3d', name: '3D', icon: Box, description: 'Three-dimensional renders' },
  { id: 'lineArt', name: 'Line Art', icon: PenLine, description: 'Minimalist outlines' },
];

// Slide dimension options
const SLIDE_DIMENSIONS: { id: SlideDimensions; name: string; description: string; aspectRatio: string }[] = [
  { id: 'fluid', name: 'Fluid', description: 'Adapts to content', aspectRatio: 'auto' },
  { id: '16x9', name: '16:9', description: 'Widescreen', aspectRatio: '16/9' },
  { id: '4x3', name: '4:3', description: 'Standard', aspectRatio: '4/3' },
];

// SVG preview graphics for slide dimensions
function DimensionPreview({ dimensionId, isSelected }: { dimensionId: SlideDimensions; isSelected: boolean }) {
  const strokeColor = isSelected ? '#2563eb' : '#9ca3af';
  const fillColor = isSelected ? '#dbeafe' : '#f3f4f6';
  const accentColor = isSelected ? '#2563eb' : '#d1d5db';

  switch (dimensionId) {
    case 'fluid':
      return (
        <svg viewBox="0 0 48 36" className="w-full h-full">
          {/* Fluid/auto-adjusting frame with wavy content */}
          <rect x="2" y="4" width="44" height="28" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" rx="2" />
          {/* Content lines that vary in height */}
          <rect x="6" y="8" width="18" height="3" fill={accentColor} rx="1" />
          <rect x="6" y="13" width="14" height="2" fill={strokeColor} opacity="0.5" rx="1" />
          <rect x="6" y="17" width="20" height="2" fill={strokeColor} opacity="0.5" rx="1" />
          <rect x="6" y="21" width="12" height="2" fill={strokeColor} opacity="0.5" rx="1" />
          {/* Expand arrows */}
          <path d="M34 16 L40 16 M40 16 L37 13 M40 16 L37 19" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M34 22 L40 22 M40 22 L37 19 M40 22 L37 25" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        </svg>
      );
    case '16x9':
      return (
        <svg viewBox="0 0 48 36" className="w-full h-full">
          {/* 16:9 widescreen frame */}
          <rect x="2" y="6" width="44" height="24.75" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" rx="2" />
          {/* Content placeholders */}
          <rect x="6" y="10" width="16" height="3" fill={accentColor} rx="1" />
          <rect x="6" y="15" width="12" height="2" fill={strokeColor} opacity="0.5" rx="1" />
          <rect x="6" y="19" width="14" height="2" fill={strokeColor} opacity="0.5" rx="1" />
          {/* Image placeholder */}
          <rect x="26" y="10" width="16" height="11" fill={accentColor} opacity="0.3" rx="1" />
          {/* 16:9 label */}
          <text x="34" y="17" fontSize="5" fill={strokeColor} textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">16:9</text>
        </svg>
      );
    case '4x3':
      return (
        <svg viewBox="0 0 48 36" className="w-full h-full">
          {/* 4:3 standard frame - taller */}
          <rect x="6" y="3" width="36" height="30" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" rx="2" />
          {/* Content placeholders */}
          <rect x="10" y="7" width="14" height="3" fill={accentColor} rx="1" />
          <rect x="10" y="12" width="10" height="2" fill={strokeColor} opacity="0.5" rx="1" />
          <rect x="10" y="16" width="12" height="2" fill={strokeColor} opacity="0.5" rx="1" />
          {/* Image placeholder */}
          <rect x="10" y="20" width="28" height="9" fill={accentColor} opacity="0.3" rx="1" />
          {/* 4:3 label */}
          <text x="24" y="26" fontSize="5" fill={strokeColor} textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">4:3</text>
        </svg>
      );
    default:
      return null;
  }
}

// SVG preview graphics for each style
function StylePreview({ styleId, isSelected }: { styleId: ImageStyle; isSelected: boolean }) {
  const baseColor = isSelected ? '#2563eb' : '#9ca3af';
  const bgColor = isSelected ? '#dbeafe' : '#f3f4f6';

  switch (styleId) {
    case 'photo':
      return (
        <svg viewBox="0 0 48 32" className="w-full h-full">
          {/* Mountain landscape photo style */}
          <rect width="48" height="32" fill={bgColor} rx="2" />
          <path d="M0 24 L12 14 L20 20 L32 8 L48 20 L48 32 L0 32 Z" fill={baseColor} opacity="0.6" />
          <path d="M0 28 L16 18 L28 24 L48 12 L48 32 L0 32 Z" fill={baseColor} opacity="0.8" />
          <circle cx="38" cy="8" r="4" fill={isSelected ? '#fbbf24' : '#d1d5db'} />
        </svg>
      );
    case 'illustration':
      return (
        <svg viewBox="0 0 48 32" className="w-full h-full">
          {/* Hand-drawn illustration style */}
          <rect width="48" height="32" fill={bgColor} rx="2" />
          {/* Sketchy tree */}
          <path d="M12 28 L12 20" stroke={baseColor} strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="16" r="6" fill="none" stroke={baseColor} strokeWidth="1.5" strokeDasharray="2,1" />
          {/* Sketchy house */}
          <path d="M28 28 L28 18 L36 18 L36 28" stroke={baseColor} strokeWidth="1.5" fill="none" />
          <path d="M26 18 L32 12 L38 18" stroke={baseColor} strokeWidth="1.5" fill="none" />
          {/* Ground line */}
          <path d="M4 28 L44 28" stroke={baseColor} strokeWidth="1" strokeDasharray="3,2" />
        </svg>
      );
    case 'abstract':
      return (
        <svg viewBox="0 0 48 32" className="w-full h-full">
          {/* Geometric abstract style */}
          <rect width="48" height="32" fill={bgColor} rx="2" />
          <circle cx="12" cy="12" r="8" fill={baseColor} opacity="0.7" />
          <rect x="20" y="6" width="12" height="12" fill={baseColor} opacity="0.5" transform="rotate(15 26 12)" />
          <polygon points="36,28 44,28 40,16" fill={baseColor} opacity="0.8" />
          <circle cx="28" cy="24" r="5" fill="none" stroke={baseColor} strokeWidth="2" />
        </svg>
      );
    case '3d':
      return (
        <svg viewBox="0 0 48 32" className="w-full h-full">
          {/* 3D rendered cube style */}
          <rect width="48" height="32" fill={bgColor} rx="2" />
          {/* 3D Cube */}
          <path d="M24 6 L36 12 L36 24 L24 30 L12 24 L12 12 Z" fill={baseColor} opacity="0.3" />
          <path d="M24 6 L36 12 L24 18 L12 12 Z" fill={baseColor} opacity="0.6" />
          <path d="M24 18 L36 12 L36 24 L24 30 Z" fill={baseColor} opacity="0.5" />
          <path d="M24 18 L12 12 L12 24 L24 30 Z" fill={baseColor} opacity="0.4" />
          {/* Sphere hint */}
          <circle cx="38" cy="8" r="4" fill={baseColor} opacity="0.3" />
          <ellipse cx="37" cy="7" rx="2" ry="1.5" fill={isSelected ? '#fff' : '#e5e7eb'} opacity="0.5" />
        </svg>
      );
    case 'lineArt':
      return (
        <svg viewBox="0 0 48 32" className="w-full h-full">
          {/* Minimalist line art style */}
          <rect width="48" height="32" fill={bgColor} rx="2" />
          {/* Face outline */}
          <circle cx="24" cy="14" r="8" fill="none" stroke={baseColor} strokeWidth="1.5" />
          <path d="M21 12 L21 13" stroke={baseColor} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M27 12 L27 13" stroke={baseColor} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M22 17 Q24 19 26 17" fill="none" stroke={baseColor} strokeWidth="1.5" />
          {/* Hair lines */}
          <path d="M18 10 Q20 4 28 6 Q32 8 30 10" fill="none" stroke={baseColor} strokeWidth="1" />
          {/* Decorative lines */}
          <path d="M6 26 L16 26" stroke={baseColor} strokeWidth="1" />
          <path d="M32 26 L42 26" stroke={baseColor} strokeWidth="1" />
        </svg>
      );
    default:
      return null;
  }
}

const MIN_SLIDES = 5;
const MAX_SLIDES = 30;

export function DesignCustomizer({
  density,
  numSlides,
  themeId,
  imageStyle,
  slideDimensions,
  themes,
  isLoadingThemes = false,
  onDensityChange,
  onNumSlidesChange,
  onThemeChange,
  onImageStyleChange,
  onSlideDimensionsChange,
  onGenerate,
  isGenerating = false,
}: DesignCustomizerProps) {
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  // Build theme options: Auto-select first, then API themes
  const themeOptions: { id: string | null; name: string }[] = [
    { id: null, name: 'Auto-select best theme' },
    ...themes.map(t => ({ id: t.id, name: t.name })),
  ];

  const selectedTheme = themeOptions.find(t => t.id === themeId) || themeOptions[0];

  function handleSlidesDecrement() {
    if (numSlides > MIN_SLIDES) {
      onNumSlidesChange(numSlides - 1);
    }
  }

  function handleSlidesIncrement() {
    if (numSlides < MAX_SLIDES) {
      onNumSlidesChange(numSlides + 1);
    }
  }

  function handleSlidesInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      onNumSlidesChange(Math.min(MAX_SLIDES, Math.max(MIN_SLIDES, value)));
    }
  }

  // Calculate preview visualization based on density
  const previewLines = density < 25 ? 2 : density < 50 ? 3 : density < 75 ? 4 : 5;
  const previewWidth = density < 25 ? '40%' : density < 50 ? '60%' : density < 75 ? '80%' : '95%';

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-n46-black tracking-tight mb-3">
          Customize your design
        </h1>
        <p className="text-n46-gray-500 text-lg">
          Fine-tune how your presentation looks and feels
        </p>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto space-y-8">
        {/* Content Density Slider */}
        <div>
          <label className="block text-sm font-medium text-n46-gray-700 mb-4">
            Content Density
          </label>

          {/* Slider with labels */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs text-n46-gray-500">
              <div className="text-left">
                <div className="font-medium text-n46-gray-700">Minimal Impact</div>
                <div>Steve Jobs keynote style</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-n46-gray-700">Information Dense</div>
                <div>Wall Street analyst style</div>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={density}
              onChange={(e) => onDensityChange(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-n46-gray-200 rounded-full appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-5
                         [&::-webkit-slider-thumb]:h-5
                         [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:bg-n46-blue
                         [&::-webkit-slider-thumb]:shadow-md
                         [&::-webkit-slider-thumb]:cursor-pointer
                         [&::-webkit-slider-thumb]:transition-transform
                         [&::-webkit-slider-thumb]:hover:scale-110
                         [&::-moz-range-thumb]:w-5
                         [&::-moz-range-thumb]:h-5
                         [&::-moz-range-thumb]:rounded-full
                         [&::-moz-range-thumb]:bg-n46-blue
                         [&::-moz-range-thumb]:border-0
                         [&::-moz-range-thumb]:shadow-md
                         [&::-moz-range-thumb]:cursor-pointer"
            />

            {/* Visual Preview */}
            <div className="mt-4 p-4 bg-n46-gray-50 rounded-xl border border-n46-gray-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-n46-blue/20 flex items-center justify-center">
                  {density < 50 ? (
                    <FileText className="w-4 h-4 text-n46-blue" />
                  ) : (
                    <LayoutGrid className="w-4 h-4 text-n46-blue" />
                  )}
                </div>
                <div className="flex-1 space-y-1.5">
                  {/* Simulated text lines */}
                  {Array.from({ length: previewLines }).map((_, i) => (
                    <div
                      key={i}
                      className="h-2 bg-n46-gray-300 rounded-full transition-all duration-300"
                      style={{
                        width: i === previewLines - 1 ? `${parseInt(previewWidth) * 0.6}%` : previewWidth,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-3 text-xs text-center text-n46-gray-500">
                {density < 25
                  ? 'Minimal text, maximum visual impact'
                  : density < 50
                    ? 'Balanced content with clear messaging'
                    : density < 75
                      ? 'Detailed content with supporting points'
                      : 'Comprehensive information density'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Number of Slides */}
        <div>
          <label className="block text-sm font-medium text-n46-gray-700 mb-3">
            Number of Slides
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSlidesDecrement}
              disabled={numSlides <= MIN_SLIDES}
              className={`
                p-2 rounded-lg border transition-all duration-150
                ${numSlides <= MIN_SLIDES
                  ? 'border-n46-gray-200 text-n46-gray-300 cursor-not-allowed'
                  : 'border-n46-gray-200 text-n46-gray-600 hover:bg-n46-gray-50 hover:border-n46-gray-300'
                }
              `}
            >
              <Minus className="w-4 h-4" />
            </button>

            <input
              type="number"
              min={MIN_SLIDES}
              max={MAX_SLIDES}
              value={numSlides}
              onChange={handleSlidesInputChange}
              className="w-20 px-3 py-2 text-center rounded-lg border border-n46-gray-200
                         text-n46-gray-900 font-medium
                         focus:outline-none focus:border-n46-blue focus:ring-2 focus:ring-n46-blue/10
                         [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
              onClick={handleSlidesIncrement}
              disabled={numSlides >= MAX_SLIDES}
              className={`
                p-2 rounded-lg border transition-all duration-150
                ${numSlides >= MAX_SLIDES
                  ? 'border-n46-gray-200 text-n46-gray-300 cursor-not-allowed'
                  : 'border-n46-gray-200 text-n46-gray-600 hover:bg-n46-gray-50 hover:border-n46-gray-300'
                }
              `}
            >
              <Plus className="w-4 h-4" />
            </button>

            <span className="text-sm text-n46-gray-500 ml-2">slides</span>
          </div>
          <p className="mt-2 text-xs text-n46-gray-500">
            Recommended: 8-15 slides for most presentations
          </p>
        </div>

        {/* Theme Selector */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <label className="block text-sm font-medium text-n46-gray-700">
              Theme (optional)
            </label>
            {isLoadingThemes && (
              <Loader2 className="w-4 h-4 text-n46-blue animate-spin" />
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              className="w-full px-4 py-3 rounded-xl border border-n46-gray-200 bg-white
                         text-left text-n46-gray-900
                         hover:border-n46-gray-300
                         focus:outline-none focus:border-n46-blue focus:ring-2 focus:ring-n46-blue/10
                         transition-all duration-150 flex items-center justify-between"
            >
              <span className={themeId ? '' : 'text-n46-gray-500'}>
                {selectedTheme.name}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-n46-gray-400 transition-transform duration-200
                  ${isThemeDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown */}
            {isThemeDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 py-2 bg-white rounded-xl
                              border border-n46-gray-200 shadow-lg z-10 animate-fade-in max-h-64 overflow-y-auto">
                {themeOptions.map((theme) => (
                  <button
                    key={theme.id ?? 'auto'}
                    onClick={() => {
                      onThemeChange(theme.id);
                      setIsThemeDropdownOpen(false);
                    }}
                    className={`
                      w-full px-4 py-2.5 text-left text-sm transition-colors duration-150
                      ${themeId === theme.id
                        ? 'bg-n46-blue/10 text-n46-blue font-medium'
                        : 'text-n46-gray-700 hover:bg-n46-gray-50'
                      }
                    `}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Slide Dimensions Selector */}
        <div>
          <label className="block text-sm font-medium text-n46-gray-700 mb-3">
            Slide Size
          </label>
          <div className="grid grid-cols-3 gap-3">
            {SLIDE_DIMENSIONS.map((dimension) => {
              const isSelected = slideDimensions === dimension.id;
              return (
                <button
                  key={dimension.id}
                  onClick={() => onSlideDimensionsChange(dimension.id)}
                  className={`
                    flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200
                    hover:scale-105
                    ${isSelected
                      ? 'border-n46-blue bg-n46-blue/5 shadow-md'
                      : 'border-n46-gray-200 hover:border-n46-gray-300 hover:bg-n46-gray-50'
                    }
                  `}
                >
                  {/* Dimension Preview Graphic */}
                  <div className="w-full aspect-[4/3] rounded-lg overflow-hidden">
                    <DimensionPreview dimensionId={dimension.id} isSelected={isSelected} />
                  </div>
                  <div className="text-center">
                    <span className={`text-sm font-medium ${isSelected ? 'text-n46-blue' : 'text-n46-gray-700'}`}>
                      {dimension.name}
                    </span>
                    <p className={`text-xs ${isSelected ? 'text-n46-blue/70' : 'text-n46-gray-500'}`}>
                      {dimension.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Image Style Selector */}
        <div>
          <label className="block text-sm font-medium text-n46-gray-700 mb-3">
            Image Style
          </label>
          <div className="grid grid-cols-5 gap-3">
            {IMAGE_STYLES.map((style) => {
              const isSelected = imageStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => onImageStyleChange(style.id)}
                  className={`
                    flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all duration-200
                    hover:scale-105
                    ${isSelected
                      ? 'border-n46-blue bg-n46-blue/5 shadow-md'
                      : 'border-n46-gray-200 hover:border-n46-gray-300 hover:bg-n46-gray-50'
                    }
                  `}
                >
                  {/* Style Preview Graphic */}
                  <div className="w-full aspect-[3/2] rounded-lg overflow-hidden">
                    <StylePreview styleId={style.id} isSelected={isSelected} />
                  </div>
                  <span className={`text-xs font-medium ${isSelected ? 'text-n46-blue' : 'text-n46-gray-600'}`}>
                    {style.name}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-n46-gray-500 text-center">
            {IMAGE_STYLES.find(s => s.id === imageStyle)?.description || 'Choose an image style'}
          </p>
        </div>

        {/* Generate Button */}
        <div className="pt-6">
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className={`
              w-full py-4 rounded-xl font-semibold text-base
              flex items-center justify-center gap-2
              transition-all duration-200
              ${isGenerating
                ? 'bg-n46-gray-200 text-n46-gray-400 cursor-not-allowed'
                : 'bg-n46-blue text-white hover:bg-n46-blue-light hover:shadow-lg hover:scale-[1.01]'
              }
            `}
          >
            <Sparkles className="w-5 h-5" />
            {isGenerating ? 'Generating...' : 'Generate Presentation'}
          </button>
          <p className="mt-3 text-center text-xs text-n46-gray-500">
            Generation typically takes 30-60 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
