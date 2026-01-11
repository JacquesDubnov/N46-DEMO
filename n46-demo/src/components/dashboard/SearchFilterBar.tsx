import { Search, ChevronDown } from 'lucide-react';
import type { UserProfile } from '../../types';

export type SortOption = 'newest' | 'oldest' | 'alphabetical';
export type FilterOption = 'all' | UserProfile;

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterBy: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const FILTER_OPTIONS: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'student', label: 'Student' },
  { value: 'business', label: 'Business' },
  { value: 'social', label: 'Social' },
  { value: 'scientific', label: 'Scientific' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'alphabetical', label: 'A-Z' },
];

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  filterBy,
  onFilterChange,
  sortBy,
  onSortChange,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-n46-gray-400" />
        <input
          type="text"
          placeholder="Search presentations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input w-full pl-12"
        />
      </div>

      {/* Filter Dropdown */}
      <div className="relative">
        <select
          value={filterBy}
          onChange={(e) => onFilterChange(e.target.value as FilterOption)}
          className="input pr-10 appearance-none cursor-pointer min-w-[140px]"
        >
          {FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-n46-gray-400 pointer-events-none" />
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="input pr-10 appearance-none cursor-pointer min-w-[120px]"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-n46-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
