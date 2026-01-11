import { create } from 'zustand';
import type { Presentation } from '../types';

interface PresentationState {
  presentations: Presentation[];
  isLoading: boolean;
  error: string | null;
  setPresentations: (presentations: Presentation[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePresentationStore = create<PresentationState>((set) => ({
  presentations: [],
  isLoading: false,
  error: null,
  setPresentations: (presentations) => set({ presentations }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
