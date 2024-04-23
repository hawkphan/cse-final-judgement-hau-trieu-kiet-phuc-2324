/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { LanguagesUsage } from "./types";
import { API_QUERIES } from "../common/constants";
import { getLanguagesUsageById } from "./apis";
import { responseWrapper } from "../common";
import { ApiResponseType } from "../../shared";

export function useGetLanguagesUsageById(
  options?: UseQueryOptions<ApiResponseType<LanguagesUsage[]>, Error, any> & {
    id?: string;
  }
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetLanguagesUsage,
  } = useQuery<ApiResponseType<LanguagesUsage[]>, Error, any>({
    queryKey: [API_QUERIES.GET_LANGUAGES_CHART_BY_ID, { id: options?.id }],
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<LanguagesUsage[]>>(getLanguagesUsageById, params);
    },
    enabled: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateProfile = () =>
    queryClient.invalidateQueries({queryKey: [API_QUERIES.GET_LANGUAGES_CHART_BY_ID]});

  const {data: languagesUsage = []} = data || [];

  return {
    languagesUsage,
    error,
    isError,
    isFetching,
    onGetLanguagesUsage,
    handleInvalidateProfile,
  };
}
