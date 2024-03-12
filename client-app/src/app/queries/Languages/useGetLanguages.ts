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
  import { API_QUERIES } from "../common/constants";

  import { Table2Params } from "../common/types";
import { Language } from ".";
import { getLanguages } from "./apis";
  
  export function useGetLanguages(
    options?: UseQueryOptions<PaginationResponseNetType<Language>, Error> & {
      [key: string]: string | number | string[] | boolean;
    }
  ) {
    const [params, setParams] = useState<Table2Params>({});
    const {
      error,
      data,
      isFetching,
      refetch: onGetLanguages,
    } = useQuery<PaginationResponseNetType<Language>, Error>({
      queryKey: [API_QUERIES.GET_PROBLEMS, params],
      queryFn: (query) => {
        const [, ...params] = query.queryKey;
        return responseWrapper<PaginationResponseNetType<Language>>(
          getLanguages,
          params
        );
      },
  
      notifyOnChangeProps: ["data", "isFetching"],
      enabled: !isEmpty(params),
      ...options,
    });
  
    const queryClient = useQueryClient();
  
    const handleInvalidateLanguages = () =>
      queryClient.invalidateQueries({ queryKey: [API_QUERIES.GET_LANGUAGES] });
  
    const { data: languages = [], pageSize, totalCount, succeeded } = data || {};
  
    return {
      languages,
      payloadSize: pageSize,
      totalRecords: totalCount,
      error,
      isFetching,
      succeeded,
      params,
      onGetLanguages,
      setParams,
      handleInvalidateLanguages,
    };
  }
  