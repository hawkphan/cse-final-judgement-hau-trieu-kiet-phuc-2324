/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accept } from "react-dropzone";
import { PATHS } from "../../../../configs/paths";
import { Yup } from "../../../../shared";
import { EditProfileBody } from "../../../../queries";

export const acceptedFileType: Accept = { "application/zip": [".zip"] };

export enum ProfileProperties {
  ID = "id",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  DISPLAY_NAME = "displayName",
  EMAIL = "email",
  USER_ID = "userId",
  GENDER = "gender",
  DATE_OF_BIRTH = "birthday",
  AVATAR = "Image",
}

export const mapFormData = (data: EditProfileBody, fileSelected: any) => {
  const formData = new FormData();
  if (fileSelected) {
    formData.append(ProfileProperties.AVATAR, fileSelected);
  }
  formData.append(ProfileProperties.FIRST_NAME, data.firstName);
  formData.append(ProfileProperties.LAST_NAME, data.lastName);

  formData.append(ProfileProperties.DISPLAY_NAME, data.displayName);
  formData.append(ProfileProperties.EMAIL, data.email);
  formData.append(ProfileProperties.DATE_OF_BIRTH, data.birthday);
  formData.append(ProfileProperties.GENDER, data.gender + '');

  return formData;
};

export const toBreadCrumbs = (id: string) => {
  return [
    {
      id: 0,
      label: "Profile",
      href: `${PATHS.profile.replace(":id", id)}`,
    },
    {
      id: 1,
      label: "Edit ",
    },
  ];
};

export const EditProfileFormSchema = Yup.object().shape({
  [ProfileProperties.FIRST_NAME]: Yup.string().required(),
  [ProfileProperties.LAST_NAME]: Yup.string().required(),
  [ProfileProperties.DISPLAY_NAME]: Yup.string().required(),
  [ProfileProperties.EMAIL]: Yup.string().required(),
  [ProfileProperties.GENDER]: Yup.string().required(),
  [ProfileProperties.DATE_OF_BIRTH]: Yup.string().required(),
});
