/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponseType, responseWrapper } from "../../shared";
import { Problem } from "./types";
import { API_QUERIES } from "../common/constants";
import { getProblemById } from "./problemApis";

export function useGetProblemById(
  options?: UseQueryOptions<ApiResponseType<Problem>, Error, Problem> & {
    id?: string;
  }
) {
  
  const {
    data: problem,
    error,
    isError,
    isFetching,
    refetch: onGetProblem,
  } = useQuery<ApiResponseType<Problem>, Error, Problem>({
    queryKey: [API_QUERIES.GET_PROBLEM_BY_ID, { id: options?.id }],
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<Problem>>(
        getProblemById,
        params
      );
    },
    enabled: !!options?.id,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateProblem = () =>
    queryClient.invalidateQueries({queryKey: [API_QUERIES.GET_PROBLEM_BY_ID]});

  return {
    problem,
    error,
    isError,
    isFetching,
    onGetProblem,
    handleInvalidateProblem,
  };
}
