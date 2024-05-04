/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { InMonthSubmissions } from "./types";
import { API_QUERIES } from "../common/constants";
import { getAnnualSubmissionById } from "./apis";
import { responseWrapper } from "../common";
import { ApiResponseType } from "../../shared";

export function useGetAnnualChartById(
  options?: UseQueryOptions<ApiResponseType<InMonthSubmissions[]>, Error, any> & {
    id?: string;
  }
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAnnualSubmission,
  } = useQuery<ApiResponseType<InMonthSubmissions[]>, Error, any>({
    queryKey: [API_QUERIES.GET_ANNUAL_CHART_BY_ID, { id: options?.id }],
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<InMonthSubmissions[]>>(getAnnualSubmissionById, params);
    },
    enabled: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateAnnualSubmission = () =>
    queryClient.invalidateQueries({queryKey: [API_QUERIES.GET_ANNUAL_CHART_BY_ID]});

  const {data: annualSubmission = []} = data || [];

  return {
    annualSubmission,
    error,
    isError,
    isFetching,
    onGetAnnualSubmission,
    handleInvalidateAnnualSubmission,
  };
}
