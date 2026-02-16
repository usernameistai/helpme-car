import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchHistoryState {
  history: string[];
  addSearch: (regplate: string) => void;
  clearHistory: () => void;
}

export const useSearchStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      history: [],

      addSearch: (regplate) => set((state) => {
        // 1. Remove the plate if it already exists (so we don't have duplicates)
        const filtered = state.history.filter((h) => h !== regplate);
        // 2. Add the new plate to the fornt and keep only the last 5
        const newHistory = [regplate, ...filtered].slice(0, 10);
        return { history: newHistory };
      }),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'helpme-search-history', // Unique key in localstorage
    }
  )
);