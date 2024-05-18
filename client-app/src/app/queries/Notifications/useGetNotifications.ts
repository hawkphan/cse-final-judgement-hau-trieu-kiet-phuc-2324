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
import { Notification } from "./types";
import { API_QUERIES } from "../common/constants";
import { getNotifications } from "./apis";
import { Table2Params } from "../common/types";

export function useGetNotifications(
  options?: UseQueryOptions<PaginationResponseNetType<Notification>, Error> & {
    [key: string]: string | number | string[] | boolean;
  }
) {
  const [params, setParams] = useState<Table2Params>({});
  const {
    error,
    data,
    isFetching,
    refetch: onGetNotifications,
  } = useQuery<PaginationResponseNetType<Notification>, Error>({
    queryKey: [API_QUERIES.GET_NOTIFICATIONS, params],
    queryFn: (query) => {
      const [, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseNetType<Notification>>(
        getNotifications,
        params
      );
    },

    notifyOnChangeProps: ["data", "isFetching"],
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateNotifications = () =>
    queryClient.invalidateQueries({ queryKey: [API_QUERIES.GET_NOTIFICATIONS] });

  const { data: notifications = [], pageSize, totalCount, succeeded } = data || {};

  return {
    notifications,
    payloadSize: pageSize,
    totalRecords: totalCount,
    error,
    isFetching,
    succeeded,
    params,
    onGetNotifications,
    setParams,
    handleInvalidateNotifications,
  };
}
