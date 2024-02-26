/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CreateProblemBody } from './types';
import { responseWrapper } from '../../shared';
import { createProblem } from './problemApis';

export function useCreateProblem(options?: UseMutationOptions<any, Error, CreateProblemBody>) {
  const {
    mutate: onCreateProblem,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, CreateProblemBody>({
    mutationFn: (payload: CreateProblemBody) => responseWrapper(createProblem, [payload]),
    ...options,
  });

  return {
    onCreateProblem,
    isSuccess,
    isError,
    error,
  };
}
