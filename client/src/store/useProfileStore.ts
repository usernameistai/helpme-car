import { create } from "zustand";
import type { IProfile } from "../types/profile";
import { getLeaderboard } from "../api/profile";

interface ProfileState {
  profile: IProfile | null;
  loading: boolean;
  error: string | null;
  leaderboard: any[];

  setProfile: ( data: IProfile | null) => void; // Allow null for logging out
  updateProfile: ( data: Partial<IProfile> ) => void;
  clearProfile: () => void;
  setLoading: ( value: boolean) => void;
  setError: ( message: string | null) => void;
  fetchLeaderboard: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: false,
  error: null,
  leaderboard: [],
  // ALlow setting to null to clear state easily
  setProfile: (data) => set({ profile: data , error: null }),
  // Merge existing state with new changes
  updateProfile: (data) => set((state) => ({
    profile: state.profile ? { ...state.profile, ...data } : null,
  })),

  clearProfile: () => set({ profile: null, error: null }),

  setLoading: (value) => set({ loading: value }),

  setError: (message) => set({ error: message, loading: false }),

  fetchLeaderboard: async () => {
    try {
      const data = await getLeaderboard();
      set({ leaderboard: data })
    } catch (err) {
      console.error("Leaderboard failed", err);
    }
  }
}));