/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { EditProfileBody } from "./types";
import { responseWrapper } from "../common/helpers";
import { editProfile } from "./profileApis";

export function useEditProfile(
  options?: UseMutationOptions<any, Error, EditProfileBody>
) {
  const {
    mutate: onEditProfile,
    isSuccess,
    isError,
    isPending,
    error,
  } = useMutation<any, Error, EditProfileBody>({
    mutationFn: (payload: EditProfileBody) =>
      responseWrapper(editProfile, [payload]),
    ...options,
  });

  return {
    onEditProfile,
    isSuccess,
    isPending,
    isError,
    error,
  };
}
