import { useQuery } from "@tanstack/react-query";
import { fetchAllCompanies } from "@/services/api/companies";

export default function useCompanies() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data } = await fetchAllCompanies();
      return data.data;
    },
  });

  return { data, error, isLoading };
}
