import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import {
  StatsBar,
  PresentationGrid,
  EmptyState,
  SearchFilterBar,
  type SortOption,
  type FilterOption,
} from '../components/dashboard';
import { ConfirmModal, StatsSkeleton, GridSkeleton, useToast } from '../components/common';
import {
  getAllPresentations,
  getPresentationStats,
  deletePresentation,
  updatePresentation,
} from '../api/presentations';
import type { Presentation } from '../types';

export function Dashboard() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [stats, setStats] = useState({ total: 0, thisWeek: 0, drafts: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [presentationToDelete, setPresentationToDelete] = useState<number | null>(null);

  // Load presentations
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [allPresentations, presentationStats] = await Promise.all([
          getAllPresentations(),
          getPresentationStats(),
        ]);
        setPresentations(allPresentations);
        setStats(presentationStats);
      } catch (error) {
        console.error('Failed to load presentations:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter and sort presentations
  const filteredPresentations = useMemo(() => {
    let result = [...presentations];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(query)
      );
    }

    // Apply profile filter
    if (filterBy !== 'all') {
      result = result.filter((p) => p.userProfile === filterBy);
    }

    // Apply sorting
    switch (sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'alphabetical':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [presentations, searchQuery, filterBy, sortBy]);

  // Handle delete
  const handleDeleteClick = (id: number) => {
    setPresentationToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (presentationToDelete === null) return;

    try {
      await deletePresentation(presentationToDelete);
      setPresentations((prev) => prev.filter((p) => p.id !== presentationToDelete));
      setStats((prev) => ({
        ...prev,
        total: prev.total - 1,
      }));
      addToast('success', 'Presentation deleted successfully');
    } catch (error) {
      console.error('Failed to delete presentation:', error);
      addToast('error', 'Failed to delete presentation');
    }

    setPresentationToDelete(null);
  };

  // Handle thumbnail update
  const handleUpdateThumbnail = async (id: number, thumbnailUrl: string) => {
    try {
      await updatePresentation(id, { thumbnailUrl });
      setPresentations((prev) =>
        prev.map((p) => (p.id === id ? { ...p, thumbnailUrl } : p))
      );
    } catch (error) {
      console.error('Failed to update thumbnail:', error);
    }
  };

  const hasNoPresentations = presentations.length === 0;
  const hasNoResults = filteredPresentations.length === 0 && !hasNoPresentations;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-medium text-n46-gray-900">
            Welcome back
          </h1>
          <p className="text-n46-gray-500 mt-1">
            Create and manage your AI-powered presentations
          </p>
        </div>
        <Link
          to="/create"
          className="btn-primary inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          New Presentation
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <StatsSkeleton />
          <GridSkeleton count={4} />
        </div>
      ) : hasNoPresentations ? (
        <EmptyState />
      ) : (
        <>
          {/* Stats Bar */}
          <div className="mb-6">
            <StatsBar
              total={stats.total}
              thisWeek={stats.thisWeek}
              drafts={stats.drafts}
            />
          </div>

          {/* Search and Filter */}
          <div className="mb-6">
            <SearchFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterBy={filterBy}
              onFilterChange={setFilterBy}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Presentations Grid or No Results */}
          {hasNoResults ? (
            <div className="text-center py-12">
              <p className="text-n46-gray-500">
                No presentations match your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterBy('all');
                }}
                className="text-n46-blue hover:text-n46-blue-dark mt-2 text-sm font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <PresentationGrid
              presentations={filteredPresentations}
              onDelete={handleDeleteClick}
              onUpdateThumbnail={handleUpdateThumbnail}
            />
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Presentation"
        message="Are you sure you want to delete this presentation? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />
    </div>
  );
}
