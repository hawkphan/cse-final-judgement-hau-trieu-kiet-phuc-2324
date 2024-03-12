/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { responseWrapper } from "../../shared";
import { deleteProblem } from './apis';

export function useDeleteProblem(options?: UseMutationOptions<any, Error, string>) {
    const {
      mutate: onDeleteProblem,
      isSuccess,
      isError,
      error,
    } = useMutation<any, Error, string>({
      mutationFn: (problemId: string) =>
        responseWrapper(deleteProblem, [problemId]),
      ...options,
    });
  
    return {
      onDeleteProblem,
      isSuccess,
      isError,
      error,
    };
  }