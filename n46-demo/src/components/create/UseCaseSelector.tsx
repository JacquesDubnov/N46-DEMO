import { useEffect, useState } from 'react';
import {
  BookOpen,
  FileText,
  Presentation,
  FlaskConical,
  Award,
  Rocket,
  Handshake,
  BarChart3,
  Search,
  Map,
  Users,
  Cake,
  Heart,
  Plane,
  Laugh,
  Gamepad2,
  Microscope,
  CircleDollarSign,
  LayoutGrid,
  type LucideIcon,
} from 'lucide-react';
import { USER_PROFILES, type UserProfileId } from '../../data/userProfiles';

interface UseCaseSelectorProps {
  profileId: UserProfileId | null;
  selectedUseCase: string | null;
  onSelect: (useCase: string) => void;
}

const USE_CASE_ICONS: Record<string, LucideIcon> = {
  BookOpen,
  FileText,
  Presentation,
  FlaskConical,
  Award,
  Rocket,
  Handshake,
  BarChart3,
  Search,
  Map,
  Users,
  Cake,
  Heart,
  Plane,
  Laugh,
  Gamepad2,
  Microscope,
  CircleDollarSign,
  LayoutGrid,
};

export function UseCaseSelector({ profileId, selectedUseCase, onSelect }: UseCaseSelectorProps) {
  const [animationKey, setAnimationKey] = useState(0);

  // Trigger re-animation when profile changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [profileId]);

  if (!profileId) {
    return (
      <div className="text-center text-n46-gray-500 animate-fade-in">
        <p>Please select a profile first</p>
      </div>
    );
  }

  const profile = USER_PROFILES[profileId];
  const useCases = profile.useCases;

  return (
    <div className="animate-fade-in" key={animationKey}>
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-n46-black tracking-tight mb-3">
          What are you creating?
        </h1>
        <p className="text-n46-gray-500 text-lg">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: `${profile.color}15`,
              color: profile.color,
            }}
          >
            {profile.name}
          </span>
          {' '}selected — choose your use case
        </p>
      </div>

      {/* Use Case Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {useCases.map((useCase, index) => {
          const Icon = USE_CASE_ICONS[useCase.icon];
          const isSelected = selectedUseCase === useCase.id;

          return (
            <button
              key={useCase.id}
              onClick={() => onSelect(useCase.id)}
              className={`
                group relative p-5 rounded-xl border-2 text-left
                transition-all duration-200 ease-out
                hover:scale-[1.02] hover:shadow-lg
                animate-fade-in-up
                ${isSelected
                  ? 'border-n46-blue bg-n46-blue/5 shadow-md'
                  : 'border-n46-gray-200 bg-white hover:border-n46-gray-300'
                }
              `}
              style={{
                animationDelay: `${index * 40}ms`,
              }}
            >
              {/* Icon */}
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center mb-3
                  transition-colors duration-200
                `}
                style={{
                  backgroundColor: isSelected ? `${profile.color}20` : '#F4F4F5',
                }}
              >
                {Icon && (
                  <Icon
                    className="w-5 h-5 transition-colors duration-200"
                    style={{
                      color: isSelected ? profile.color : '#71717A',
                    }}
                  />
                )}
              </div>

              {/* Name */}
              <h3
                className={`
                  font-medium text-base mb-1 transition-colors duration-200
                  ${isSelected ? 'text-n46-black' : 'text-n46-gray-700'}
                `}
              >
                {useCase.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-n46-gray-500 leading-relaxed">
                {useCase.description}
              </p>

              {/* Selected indicator */}
              {isSelected && (
                <div
                  className="absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: profile.color }}
                >
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
