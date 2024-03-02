/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { EditProblemBody } from './types';
import { responseWrapper } from '../common/helpers';
import { editProblem } from './problemApis';


export function useEditProblem(
  options?: UseMutationOptions<any, Error, any>,
) {
  const {
    mutate: onEditProblem,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, any>({
    mutationFn: (payload: EditProblemBody) =>
      responseWrapper(editProblem, [payload]),
    ...options,
  });

  return {
    onEditProblem,
    isSuccess,
    isError,
    error,
  };
}
