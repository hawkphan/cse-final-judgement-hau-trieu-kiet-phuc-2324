/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CreateProblemBody } from './types';
import { responseWrapper } from '../../shared';
import { createProblem } from './problemApis';

export function useCreateProblem(options?: UseMutationOptions<any, Error, any>) {
  const {
    mutate: onCreateProblem,
    isSuccess,
    isError,
    isPending,
    error,
  } = useMutation<any, Error, any>({
    mutationFn: (payload: CreateProblemBody) => responseWrapper(createProblem, [payload]),
    ...options,
  });

  return {
    onCreateProblem,
    isSuccess,
    isPending,
    isError,
    error,
  };
}
