/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { Profile } from "./types";
import { API_QUERIES } from "../common/constants";
import { getProfileById } from "./apis";
import { responseWrapper } from "../common";
import { ApiResponseType } from "../../shared";

export function useGetProfileById(
  options?: UseQueryOptions<ApiResponseType<Profile>, Error, any> & {
    id?: string;
  }
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetProfile,
  } = useQuery<ApiResponseType<Profile>, Error, any>({
    queryKey: [API_QUERIES.GET_PROFILE_BY_ID, { id: options?.id }],
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<Profile>>(getProfileById, params);
    },
    enabled: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateProfile = () =>
    queryClient.invalidateQueries({queryKey: [API_QUERIES.GET_PROFILE_BY_ID]});

  const {data: profile = []} = data || [];

  return {
    profile,
    error,
    isError,
    isFetching,
    onGetProfile,
    handleInvalidateProfile,
  };
}
