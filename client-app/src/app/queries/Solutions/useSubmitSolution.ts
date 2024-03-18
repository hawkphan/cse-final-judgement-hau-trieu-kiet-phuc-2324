/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '../../shared';
import { CreateSolutionBody } from '.';
import { submitSolution } from './apis';

export function useSubmitSolution(options?: UseMutationOptions<any, Error, any>) {
  const {
    mutate: onSubmitSolution,
    isSuccess,
    isError,
    isPending,
    error,
  } = useMutation<any, Error, any>({
    mutationFn: (payload: CreateSolutionBody) => responseWrapper(submitSolution, [payload]),
    ...options,
  });

  return {
    onSubmitSolution,
    isSuccess,
    isPending,
    isError,
    error,
  };
}
