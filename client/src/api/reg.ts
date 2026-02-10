import axios from "axios";
import type { IReg } from "../types/reg";

// Base API instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL_REG || "http://localhost:5000/api/reg",
  headers: {
    "Content-Type": "application/json",
  },
});

// Create a new registration
export const createReg = async ( regData: Partial<IReg>, token?: string | null ): Promise<IReg> => {
  const { data } = await api.post("/", regData, {
    // If token exists, add the Bearer header
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  }); // { data } is destructured res.data
  return data;
};

// Get all registrations (non-deleted)
export const getAllRegs = async () => { // async (): Promise<IReg[]>
  const { data } = await api.get("/");
  return data;
};

//Get registration by ID
export const getRegById = async ( id: string ) => { // : Promise<IReg>
  const { data } = await api.get(`/${id}`);
  return data;
};

// Get regisytration by plate
export const getRegByPlate = async ( regplate: string ) => { // : Promise<IReg>
  const { data } = await api.get(`/reg/${regplate}`);
  return data;
};

// Update a registration by ID
export const updateReg = async ( regplate: string, regData: Partial<IReg>, token?: string | null ) => { // : Promise<IReg>
  const { data } = await api.put(`/reg/${regplate}`, regData, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return data;
};

// Soft delete a registration by ID
export const deleteReg = async ( regplate: string ) => { // : Promise<{ message: string }> 
  const { data } = await api.delete(`/${regplate}`);
  return data;
};

// Add function to fetch cars linked ot the user
export const getMyContributions = async (getToken: () => Promise<string | null>) => {
  const token = await getToken();
  const { data } = await api.get("/my-activity", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data; // Should be an aray of IReg objects
}