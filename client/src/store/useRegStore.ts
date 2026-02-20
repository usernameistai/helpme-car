import { create } from "zustand";
import type { IReg } from "../types/reg";
import {
  createReg as apiCreateReg, 
  getAllRegs as apiGetAllRegs, 
  getRegById as apiGetRegById, 
  getRegByPlate as apiGetRegByPlate, 
  updateReg as apiUpdateReg, 
  deleteReg as apiDeleteReg,
} from "../api/reg";

// Define the store state and actions
interface RegState {
  regs: IReg[];
  selectedReg: IReg | null;
  loading: boolean;
  error: string | null;
  fetchRegs: () => Promise<void>;
  fetchRegById: ( id: string ) => Promise<void>;
  fetchRegByPlate: ( regplate: string ) => Promise<IReg | null>; // was void
  createReg: ( reg: Partial<IReg>, token?: string | null ) => Promise<IReg | undefined>; // new interface to account for auth token
  // createReg: ( reg: Partial<IReg> ) => Promise<IReg | undefined>;
  updateReg: ( regplate: string, updated: Partial<IReg>, token: string | null ) => Promise<IReg | undefined>; // new interface to account for auth token
  // updateReg: ( id: string, updated: Partial<IReg> ) => Promise<void>;
  deleteReg: ( id: string ) => Promise<void | null>;
};

// Create the Zustand store
export const useRegStore = create<RegState>((set) => ({
  regs: [],
  selectedReg: null,
  loading: false,
  error: null,

  // Fetch all registrations
  fetchRegs: async () => {
    set({ loading: true, error: null });
    try {
      const regs = await apiGetAllRegs();
      set({ regs: regs });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch registrations' });
    } finally {
      set({ loading: false })
    }
  },

  // Fetch by ID
  fetchRegById: async ( id: string ) => {
    set({ loading: true, error: null});
    try {
      const reg = await apiGetRegById(id);
      set({ selectedReg: reg, loading: false }); // added loading: false
      return reg; // added this as update
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch registration" });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch by plate
  fetchRegByPlate: async ( regplate: string ) => {
    set({ loading: true, error: null })
    try {
      const reg = await apiGetRegByPlate(regplate);
      set({ selectedReg: reg });
      return reg; // added this for notFound
    } catch (err: any) {
      if (err.response?.status === 404) {
        // Instead of generic axios error, return a structured error
        // throw { notFound: true }; // Added
        return null;
      } else {
        set({ error: err.message || "Failed to fetch registration" });
        throw err; // Added
      }
    } finally {
      set({ loading: false });
    }
  },

  // Create registration
  createReg: async ( regData: Partial<IReg>, token?: string | null ): Promise<IReg | undefined> => {
    set({ loading: true, error: null});
    try { // added 2nd argument token so can be passed in for being called in the RegForm
      const newReg = await apiCreateReg(regData, token);

      set(( state ) => ({ regs: [...state.regs, newReg as IReg] })); // added as IReg
      return newReg;
    } catch (err: any) {
      set({ error: err.message || "Failed to create registration" });
    } finally {
      set({ loading: false });
    }
  }, 

  // Update registration
  updateReg: async ( regplate: string, updated: Partial<IReg>, token?: string | null ) => {
    set({ loading: true, error: null });
    try {
      const updatedReg = await apiUpdateReg(regplate, updated, token);
      set(( state ) => ({
        regs: state.regs.map(
          (r) => (r.regplate === regplate ? updatedReg : r)
        ),
        selectedReg: 
          state.selectedReg?.regplate === regplate ? updatedReg : state.selectedReg,
      }));
      return updatedReg;
    } catch (err: any) {
      set({ error: err.message || "Failed to update registration" });
    } finally {
      set({ loading: false });
    }
  },

  // Delete registration
  deleteReg: async ( regplate: string ) => {
    set({ loading: true, error: null });
    try {
      await apiDeleteReg(regplate);
      set((state) => ({
        regs: state.regs.filter((r) => r.regplate !== regplate),
        selectedReg: state.selectedReg?.regplate === regplate 
          ? null
          : state.selectedReg,
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to delete registration" });
    } finally {
      set({ loading: false });
    }
  },
}));