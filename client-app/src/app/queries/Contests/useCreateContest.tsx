/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '../../shared';
import { CreateContestBody } from '.';
import { createContest } from './apis';

export function useCreateContest(options?: UseMutationOptions<any, Error, CreateContestBody>) {

  const {
    mutate: onCreateContest,
    isSuccess,
    isError,
    isPending,
    error,
  } = useMutation<any, Error, any>({
    mutationFn: (payload: CreateContestBody) => responseWrapper(createContest, [payload]),
    ...options,
  });

  return {
    onCreateContest,
    isSuccess,
    isPending,
    isError,
    error,
  };
}
