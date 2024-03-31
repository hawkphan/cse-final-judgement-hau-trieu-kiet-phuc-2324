/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accept } from "react-dropzone";
import { EditProfileBody } from "../../../../queries/Profiles/types";
import { PATHS } from "../../../../configs/paths";
import { Yup } from "../../../../shared";

export const acceptedFileType: Accept = { "application/zip": [".zip"] };

export enum ProfileProperties {
  ID = "id",
  FIRSTNAME = "firstName",
  LASTNAME = "lastName",
  USERNAME = "userName",
  EMAIL = "email",
  DESCRIPTION = "description",
  USER_ID = "userId",
  GENDER = "gender",
  DATEOFBIRTH = "dateOfBirth",
}

export enum ValidationMessage {
  EXISTING_CODE = "This problem code has been existed!",
  LACK_OF_FILE = "Please provide a file for test cases!",
}

export const mapFormData = (
  data:  EditProfileBody,
  fileSelected: any,
  userId: string,
) => {
  const formData = new FormData();

  if (ProfileProperties.ID in data) {
    formData.append(ProfileProperties.ID, data.id);
  }
  formData.append(ProfileProperties.FIRSTNAME, data.firstName);
  formData.append(ProfileProperties.LASTNAME, data.lastName);
  formData.append(ProfileProperties.USERNAME, data.displayName);
  formData.append(ProfileProperties.EMAIL, data.email);
  // formData.append(ProfileProperties.DESCRIPTION, data.description);
  return formData;
};

export const toBreadCrumbs = (id: string) => {
  return [
    {
      id: 0,
      label: 'Profile: ' + id,
      href: `${PATHS.profile}`,
    },
    {
      id: 1,
      label:  'Edit ',
    },
  ];
};

export const EditProfileFormSchema = Yup.object().shape({
  [ProfileProperties.ID]: Yup.string().required(),
  [ProfileProperties.FIRSTNAME]: Yup.string().required(),
  [ProfileProperties.LASTNAME]: Yup.string().required(),
  [ProfileProperties.USERNAME]: Yup.string().required(),
  [ProfileProperties.EMAIL]: Yup.string().required(),
});
