import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import {
  PaginationResponseNetType,
  isEmpty,
  responseWrapper,
} from "../../shared";
import { API_QUERIES, Table2Params } from "../common";
import { SelectOption } from "../../shared/components/common/MuiMultiSelect";
import { Profile } from "./types";
import { getProfiles } from "./apis";

export function useGetProfiles(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UseQueryOptions<PaginationResponseNetType<Profile<any>>, Error> & {
    [key: string]: string | number | string[] | boolean;
  }
) {
  const [params, setParams] = useState<Table2Params>({});
  const {
    error,
    data,
    isFetching,
    refetch: onGetProfiles,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useQuery<PaginationResponseNetType<Profile<any>>, Error>({
    queryKey: [API_QUERIES.GET_PROFILES, params],
    queryFn: (query) => {
      const [, ...params] = query.queryKey;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return responseWrapper<PaginationResponseNetType<Profile<any>>>(
        getProfiles,
        params
      );
    },

    notifyOnChangeProps: ["data", "isFetching"],
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateProfiles = () =>
    queryClient.invalidateQueries({ queryKey: [API_QUERIES.GET_PROFILES] });

  const { data: profiles = [], pageSize, totalCount, succeeded } = data || {};

  const selectOptions: SelectOption[] = profiles.map((item) => ({
    label: `${item.displayName}`,
    value: `${item.id}`,
  }));

  return {
    profiles,
    payloadSize: pageSize,
    totalRecords: totalCount,
    error,
    isFetching,
    succeeded,
    params,
    selectOptions,
    onGetProfiles,
    setParams,
    handleInvalidateProfiles,
  };
}
