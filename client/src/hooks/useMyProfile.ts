import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../api/profile";
import { useAuth } from "@clerk/clerk-react";

export const useMyProfile = () => {
  const { getToken, isLoaded } = useAuth();

  return useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile(getToken),
    enabled: isLoaded, // Prevents "Ghost" calls before Clerk is ready
    staleTime: 100 * 60 * 5,
  });
};