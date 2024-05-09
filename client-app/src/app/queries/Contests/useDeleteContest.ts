/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { responseWrapper } from "../../shared";
import { deleteContest } from "./apis";

export function useDeleteContest(
  options?: UseMutationOptions<any, Error, string>
) {
  const {
    mutate: onDeleteContest,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, string>({
    mutationFn: (contestId: string) =>
      responseWrapper(deleteContest, [contestId]),
    ...options,
  });

  return {
    onDeleteContest,
    isSuccess,
    isError,
    error,
  };
}
