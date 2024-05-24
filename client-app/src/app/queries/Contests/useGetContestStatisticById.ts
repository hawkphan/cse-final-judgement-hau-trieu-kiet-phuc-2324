// /* eslint-disable no-debugger */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiResponseType, responseWrapper } from "../../shared";
import { API_QUERIES } from "../common/constants";
import { ContestStatistic } from "./types";
import { getContestStatisticById } from "./apis";

export function useGetContestStatisticById(
  options?: UseQueryOptions<ApiResponseType<ContestStatistic>, Error, ContestStatistic> & {
    id?: string;
  }
) {
  const 
  {
    data: contestStatistic,
    error,
    isError,
    isFetching,
    refetch: onGetContestStatistic,
  }
   = useQuery<ApiResponseType<ContestStatistic>, Error, ContestStatistic>({
    queryKey: [API_QUERIES.GET_CONTEST_STATISTIC_BY_ID, { id: options?.id }],
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<ContestStatistic>>(
        getContestStatisticById,
        params
      );
    },
    enabled: !!options?.id,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateContestStatistic = () =>
    queryClient.invalidateQueries({
      queryKey: [API_QUERIES.GET_CONTEST_STATISTIC_BY_ID],
    });

  return {
    contestStatistic,
    error,
    isError,
    isFetching,
    onGetContestStatistic,
    handleInvalidateContestStatistic
  };

}
