import axios from "axios";
import type { IProfile } from "../types/profile";

// Base API instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL_PROFILE || "http://localhost:5000/api/profile", 
  withCredentials: true, // added , if your backend needs cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMyProfile = async (getToken: () => Promise<string | null>) => {
  const token = await getToken();
  if (!token) {
    console.log("No clerk token found");
    throw new Error("No clerk token found");
  };

  const res = await api.get("/", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

// Update current user'sprofile
export const updateMyProfile = async ( 
  profileData: Partial<IProfile>,
  getToken: () => Promise<string | null>
  ): Promise<IProfile> => {
    const token = await getToken();
    const { data } = await api.put("/", profileData, {
      headers: { Authorization: `Bearer ${token}` }
  }); // was me
  return data;
};

// Get any profile by id
export const getProfileById = async ( id: string ): Promise<IProfile> => {
  const { data } = await api.get(`/${id}`);
  return data;
};

// get the Leaderboards
export const getLeaderboard = async () => {
  const { data } = await api.get("/leaderboard");
  return data;
}