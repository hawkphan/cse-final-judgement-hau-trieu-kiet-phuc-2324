/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponseType, responseWrapper } from "../../shared";
import { API_QUERIES } from "../common/constants";
import { Contest } from "./types";
import { getContestById } from "./apis";

export function useGetContestById(
  options?: UseQueryOptions<ApiResponseType<Contest>, Error, Contest> & {
    id?: string;
  }
) {
  const {
    data: contest,
    error,
    isError,
    isFetching,
    refetch: onGetContest,
  } = useQuery<ApiResponseType<Contest>, Error, Contest>({
    queryKey: [API_QUERIES.GET_CONTEST_BY_ID, { id: options?.id }],
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<Contest>>(
        getContestById,
        params
      );
    },
    enabled: !!options?.id,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateContest = () =>
    queryClient.invalidateQueries({queryKey: [API_QUERIES.GET_CONTEST_BY_ID]});

  return {
    contest,
    error,
    isError,
    isFetching,
    onGetContest,
    handleInvalidateContest,
  };
}
