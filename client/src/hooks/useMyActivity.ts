import { useQuery } from "@tanstack/react-query";
import { getMyContributions } from "../api/reg";
import { useAuth } from "@clerk/clerk-react";

export const useMyActivity = () => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ['my-activity'],
    queryFn: () => getMyContributions(getToken),
    staleTime: 1000 * 60 * 5, // Keep fresh for 5 mins
  });
};