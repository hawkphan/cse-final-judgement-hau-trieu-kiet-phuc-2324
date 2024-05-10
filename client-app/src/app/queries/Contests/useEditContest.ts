/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { responseWrapper } from "../common/helpers";
import { EditContestBody } from "../Contests";
import { editContest } from "../Contests/apis";

export function useEditContest(
  options?: UseMutationOptions<any, Error, EditContestBody>
) {
  const {
    mutate: onEditContest,
    isSuccess,
    isError,
    isPending,
    error,
  } = useMutation<any, Error, EditContestBody>({
    mutationFn: (payload: EditContestBody) =>
      responseWrapper(editContest, [payload]),
    ...options,
  });

  return {
    onEditContest,
    isSuccess,
    isPending,
    isError,
    error,
  };
}
