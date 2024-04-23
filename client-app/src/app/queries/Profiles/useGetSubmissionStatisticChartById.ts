/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { DifficultyStatistic,  SubmissionStatistic } from "./types";
import { API_QUERIES } from "../common/constants";
import { getSubmissionStatisticById } from "./apis";
import { responseWrapper } from "../common";
import { ApiResponseType } from "../../shared";

export function useGetSubmissionStatisticChartById(
  options?: UseQueryOptions<ApiResponseType<SubmissionStatistic<DifficultyStatistic>>, Error, any> & {
    id?: string;
  }
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetSubmissionStatisticSubmission,
  } = useQuery<ApiResponseType<SubmissionStatistic<DifficultyStatistic>>, Error, any>({
    queryKey: [API_QUERIES.GET_SUBMISSIONS_CHART_BY_ID, { id: options?.id }],
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<SubmissionStatistic<DifficultyStatistic>>>(getSubmissionStatisticById, params);
    },
    enabled: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateProfile = () =>
    queryClient.invalidateQueries({queryKey: [API_QUERIES.GET_SUBMISSIONS_CHART_BY_ID]});

  const {data: submissionStatistic = []} = data || [];

  return {
    submissionStatistic,
    error,
    isError,
    isFetching,
    onGetSubmissionStatisticSubmission,
    handleInvalidateProfile,
  };
}
