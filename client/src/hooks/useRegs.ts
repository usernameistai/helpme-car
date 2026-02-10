import { useQuery } from "@tanstack/react-query"
import { getAllRegs, getRegByPlate } from "../api/reg"

export const useRegs = () => {
  return useQuery({
    queryKey: ['regs'],
    queryFn: getAllRegs,
    staleTime: 1000 * 60 * 5,
  });
};

export const useRegdetail = (regplate: string) => {
  return useQuery({
    queryKey: ['reg', regplate],
    queryFn: () => getRegByPlate(regplate),
    enabled: !!regplate,
    staleTime: 1000 * 60 * 5,
    retry: false, // professional: don't spam servers on 404s
  });
};