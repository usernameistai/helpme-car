import { useQuery } from "@tanstack/react-query"
import { getLeaderboard } from "../api/profile"

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    staleTime: 1000 * 60 * 5,
  });
};