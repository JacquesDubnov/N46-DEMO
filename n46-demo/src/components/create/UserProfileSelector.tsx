import {
  GraduationCap,
  Briefcase,
  PartyPopper,
  Microscope,
  type LucideIcon,
} from 'lucide-react';
import { USER_PROFILES, type UserProfileId } from '../../data/userProfiles';

interface UserProfileSelectorProps {
  selectedProfile: UserProfileId | null;
  onSelect: (profile: UserProfileId) => void;
}

const PROFILE_ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  Briefcase,
  PartyPopper,
  Microscope,
};

// Persona thumbnail graphics
function PersonaThumbnail({ profileId, isSelected, color }: { profileId: string; isSelected: boolean; color: string }) {
  const baseColor = isSelected ? color : '#9ca3af';
  const bgColor = isSelected ? `${color}15` : '#f9fafb';
  const skinTone = '#fcd5b8';
  const hairColor = profileId === 'student' ? '#6B4423' : profileId === 'business' ? '#1a1a1a' : profileId === 'social' ? '#8B4513' : '#4a4a4a';

  switch (profileId) {
    case 'student':
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <rect width="80" height="80" fill={bgColor} rx="12" />
          {/* Student with graduation cap */}
          {/* Face */}
          <circle cx="40" cy="42" r="16" fill={skinTone} />
          {/* Hair */}
          <path d="M26 38 Q28 26 40 24 Q52 26 54 38 L54 42 Q52 36 40 34 Q28 36 26 42 Z" fill={hairColor} />
          {/* Eyes */}
          <circle cx="35" cy="42" r="2" fill="#1a1a1a" />
          <circle cx="45" cy="42" r="2" fill="#1a1a1a" />
          {/* Smile */}
          <path d="M36 49 Q40 52 44 49" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          {/* Graduation cap */}
          <polygon points="40,16 60,24 40,32 20,24" fill={baseColor} />
          <rect x="38" y="12" width="4" height="6" fill={baseColor} />
          <circle cx="40" cy="12" r="3" fill={baseColor} />
          {/* Tassel */}
          <path d="M60 24 L60 32 Q58 36 56 32" stroke={isSelected ? '#fbbf24' : '#d1d5db'} strokeWidth="2" fill="none" />
          {/* Shirt/collar hint */}
          <path d="M30 58 L40 64 L50 58" stroke={baseColor} strokeWidth="3" fill="none" />
        </svg>
      );
    case 'business':
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <rect width="80" height="80" fill={bgColor} rx="12" />
          {/* Business person with suit */}
          {/* Face */}
          <circle cx="40" cy="38" r="14" fill={skinTone} />
          {/* Hair - professional style */}
          <path d="M28 34 Q30 22 40 20 Q50 22 52 34 L52 38 Q50 30 40 28 Q30 30 28 38 Z" fill={hairColor} />
          {/* Glasses */}
          <rect x="30" y="35" width="8" height="6" rx="1" fill="none" stroke={baseColor} strokeWidth="1.5" />
          <rect x="42" y="35" width="8" height="6" rx="1" fill="none" stroke={baseColor} strokeWidth="1.5" />
          <path d="M38 38 L42 38" stroke={baseColor} strokeWidth="1" />
          {/* Eyes behind glasses */}
          <circle cx="34" cy="38" r="1.5" fill="#1a1a1a" />
          <circle cx="46" cy="38" r="1.5" fill="#1a1a1a" />
          {/* Confident smile */}
          <path d="M36 45 Q40 48 44 45" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          {/* Suit jacket */}
          <path d="M24 80 L26 56 L40 62 L54 56 L56 80" fill="#1a1a1a" />
          {/* Suit lapels */}
          <path d="M32 56 L40 66 L48 56" fill="none" stroke="#374151" strokeWidth="2" />
          {/* Tie */}
          <path d="M40 52 L38 58 L40 72 L42 58 Z" fill={baseColor} />
          {/* Shirt collar */}
          <path d="M34 54 L40 52 L46 54" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      );
    case 'social':
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <rect width="80" height="80" fill={bgColor} rx="12" />
          {/* Fun social person with party elements */}
          {/* Face */}
          <circle cx="40" cy="40" r="15" fill={skinTone} />
          {/* Fun wavy hair */}
          <path d="M25 36 Q26 22 32 20 Q38 18 40 20 Q42 18 48 20 Q54 22 55 36 L55 40 Q52 28 40 26 Q28 28 25 40 Z" fill={hairColor} />
          {/* Happy eyes */}
          <path d="M32 38 Q34 36 36 38" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
          <path d="M44 38 Q46 36 48 38" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
          {/* Big smile */}
          <path d="M33 46 Q40 52 47 46" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
          {/* Party hat */}
          <polygon points="56,14 64,30 48,30" fill={baseColor} />
          <circle cx="56" cy="14" r="3" fill={isSelected ? '#fbbf24' : '#d1d5db'} />
          {/* Confetti */}
          <rect x="18" y="18" width="4" height="4" fill={baseColor} transform="rotate(20 20 20)" />
          <rect x="62" y="42" width="3" height="3" fill={isSelected ? '#fbbf24' : '#d1d5db'} transform="rotate(-15 63 43)" />
          <circle cx="22" cy="48" r="2" fill={baseColor} opacity="0.7" />
          {/* Casual shirt */}
          <path d="M28 58 Q40 66 52 58 L56 80 L24 80 Z" fill={baseColor} />
        </svg>
      );
    case 'scientific':
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <rect width="80" height="80" fill={bgColor} rx="12" />
          {/* Scientist with lab coat */}
          {/* Face */}
          <circle cx="40" cy="38" r="14" fill={skinTone} />
          {/* Thoughtful hair */}
          <path d="M28 34 Q29 20 40 18 Q51 20 52 34 L52 38 Q50 26 40 24 Q30 26 28 38 Z" fill={hairColor} />
          {/* Scientific glasses */}
          <circle cx="34" cy="37" r="5" fill="none" stroke={baseColor} strokeWidth="1.5" />
          <circle cx="46" cy="37" r="5" fill="none" stroke={baseColor} strokeWidth="1.5" />
          <path d="M39 37 L41 37" stroke={baseColor} strokeWidth="1" />
          <path d="M29 36 L26 34" stroke={baseColor} strokeWidth="1" />
          <path d="M51 36 L54 34" stroke={baseColor} strokeWidth="1" />
          {/* Eyes */}
          <circle cx="34" cy="37" r="1.5" fill="#1a1a1a" />
          <circle cx="46" cy="37" r="1.5" fill="#1a1a1a" />
          {/* Thoughtful expression */}
          <path d="M37 45 L43 45" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          {/* Lab coat */}
          <path d="M24 80 L26 54 L54 54 L56 80" fill="white" stroke="#e5e7eb" strokeWidth="1" />
          {/* Coat lapels */}
          <path d="M34 54 L40 60 L46 54" fill="none" stroke={baseColor} strokeWidth="2" />
          {/* Flask icon on coat */}
          <path d="M38 68 L38 72 Q38 76 42 76 Q46 76 46 72 L46 68" fill="none" stroke={baseColor} strokeWidth="1.5" />
          <path d="M36 68 L48 68" stroke={baseColor} strokeWidth="1.5" />
          {/* Bubbles */}
          <circle cx="40" cy="74" r="1" fill={baseColor} opacity="0.6" />
          <circle cx="43" cy="73" r="0.7" fill={baseColor} opacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
}

export function UserProfileSelector({ selectedProfile, onSelect }: UserProfileSelectorProps) {
  const profiles = Object.values(USER_PROFILES);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-n46-black tracking-tight mb-3">
          Who are you?
        </h1>
        <p className="text-n46-gray-500 text-lg">
          Choose your profile to optimize your presentation
        </p>
      </div>

      {/* Profile Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {profiles.map((profile, index) => {
          const Icon = PROFILE_ICONS[profile.icon];
          const isSelected = selectedProfile === profile.id;

          return (
            <button
              key={profile.id}
              onClick={() => onSelect(profile.id as UserProfileId)}
              className={`
                group relative p-4 rounded-xl border-2 text-left
                transition-all duration-200 ease-out
                hover:scale-[1.02] hover:shadow-lg
                animate-fade-in-up
                ${isSelected
                  ? 'border-n46-blue bg-n46-blue/5 shadow-md'
                  : 'border-n46-gray-200 bg-white hover:border-n46-gray-300'
                }
              `}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Persona Thumbnail */}
              <div className="w-full aspect-square mb-3 rounded-lg overflow-hidden">
                <PersonaThumbnail
                  profileId={profile.id}
                  isSelected={isSelected}
                  color={profile.color}
                />
              </div>

              {/* Name with Icon */}
              <div className="flex items-center gap-2 mb-1">
                {Icon && (
                  <Icon
                    className="w-4 h-4 transition-colors duration-200"
                    style={{
                      color: isSelected ? profile.color : '#71717A',
                    }}
                  />
                )}
                <h3
                  className={`
                    font-semibold text-base transition-colors duration-200
                    ${isSelected ? 'text-n46-black' : 'text-n46-gray-700'}
                  `}
                >
                  {profile.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs text-n46-gray-500 leading-relaxed">
                {profile.description}
              </p>

              {/* Selected indicator */}
              {isSelected && (
                <div
                  className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: profile.color }}
                >
                  <svg
                    className="w-3 h-3 text-white"
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

              {/* Color accent bar at bottom */}
              <div
                className={`
                  absolute bottom-0 left-0 right-0 h-1 rounded-b-xl
                  transition-opacity duration-200
                  ${isSelected ? 'opacity-100' : 'opacity-0'}
                `}
                style={{ backgroundColor: profile.color }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
