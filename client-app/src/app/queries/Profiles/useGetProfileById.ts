/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { Profile, UserActivityRecord } from "./types";
import { API_QUERIES } from "../common/constants";
import { getProfileById } from "./apis";
import { responseWrapper } from "../common";
import { ApiResponseType } from "../../shared";

export function useGetProfileById(
  options?: UseQueryOptions<ApiResponseType<Profile<UserActivityRecord>>, Error, any> & {
    id?: string;
  }
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetProfile,
  } = useQuery<ApiResponseType<Profile<UserActivityRecord>>, Error, any>({
    queryKey: [API_QUERIES.GET_PROFILE_BY_ID, { id: options?.id }],
    queryFn: (query) => {
      const [_, ...params] = query.queryKey;
      return responseWrapper<ApiResponseType<Profile<UserActivityRecord>>>(getProfileById, params);
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
