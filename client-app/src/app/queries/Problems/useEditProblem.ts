/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { EditProblemBody } from "./types";
import { responseWrapper } from "../common/helpers";
import { editProblem } from "./apis";

export function useEditProblem(
  options?: UseMutationOptions<any, Error, EditProblemBody>
) {
  const {
    mutate: onEditProblem,
    isSuccess,
    isError,
    isPending,
    error,
  } = useMutation<any, Error, EditProblemBody>({
    mutationFn: (payload: EditProblemBody) =>
      responseWrapper(editProblem, [payload]),
    ...options,
  });

  return {
    onEditProblem,
    isSuccess,
    isPending,
    isError,
    error,
  };
}
