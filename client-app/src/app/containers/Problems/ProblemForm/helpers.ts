/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accept } from "react-dropzone";
import { Yup, isEmpty } from "../../../shared";
import { PATHS } from "../../../configs/paths";
import { CreateProblemBody, EditProblemBody } from "../../../queries";

export const acceptedFileType: Accept = { "application/zip": [".zip"] };

export enum ProblemProperties {
  ID = "id",
  TITLE = "title",
  CODE = "code",
  DESCRIPTION = "description",
  TIME_LIMIT = "timeLimit",
  USER_ID = "userId",
  TEST_CASES_FILE = "file",
  MEMORY_LIMIT = "memoryLimit",
  COMPARE_MODE = "gradeMode",
  APPROXIMATE_VALUE = "approximateRate",
  VALID_LANGUAGES = "allowedLanguages",
  PRIVACY_STATUS = "privacyStatus",
}

export enum ValidationMessage {
  EXISTING_CODE = "This problem code has been existed!",
  LACK_OF_FILE = "Please provide a file for test cases!",
}

export const mapFormData = (
  data: CreateProblemBody | EditProblemBody,
  fileSelected: any,
  userId: string,
  isEdit: boolean,
  selectedLanguages: number[]
) => {
  const formData = new FormData();

  if (isEdit && ProblemProperties.ID in data) {
    formData.append(ProblemProperties.ID, data.id);
  }

  formData.append(ProblemProperties.TEST_CASES_FILE, fileSelected);
  formData.append(ProblemProperties.CODE, data.code);
  formData.append(ProblemProperties.TITLE, data.title);
  formData.append(ProblemProperties.DESCRIPTION, data.description);
  formData.append(ProblemProperties.TIME_LIMIT, data.timeLimit.toString());
  formData.append(ProblemProperties.MEMORY_LIMIT, data.memoryLimit.toString());
  formData.append(ProblemProperties.USER_ID, userId);
  formData.append(ProblemProperties.COMPARE_MODE, data.gradeMode.toString());
  formData.append(
    ProblemProperties.APPROXIMATE_VALUE,
    data.approximateRate.toString()
  );
  formData.append(
    ProblemProperties.VALID_LANGUAGES,
    !isEmpty(selectedLanguages) ? selectedLanguages.join(",") : ""
  );
  formData.append(
    ProblemProperties.PRIVACY_STATUS,
    data.privacyStatus.toString()
  );

  return formData;
};

export const toBreadCrumbs = (isEdit: boolean, id?: string) => {
  return [
    {
      id: 0,
      label: "Problems",
      href: `${PATHS.problems}`,
    },
    {
      id: 1,
      label: isEdit ? "Edit " + id : "Create",
    },
  ];
};

export const CreateProblemFormSchema = Yup.object().shape({
  [ProblemProperties.CODE]: Yup.string().required(),
  [ProblemProperties.TITLE]: Yup.string().required(),
  [ProblemProperties.TIME_LIMIT]: Yup.string().required(),
  [ProblemProperties.MEMORY_LIMIT]: Yup.string().required(),
  // [ProblemProperties.COMPARE_MODE]: Yup.string().required(),
  // [ProblemProperties.VALID_LANGUAGES]: Yup.array().defined(),
});
export const EditProblemFormSchema = Yup.object().shape({
  [ProblemProperties.CODE]: Yup.string().required(),
  [ProblemProperties.TITLE]: Yup.string().required(),
  [ProblemProperties.TIME_LIMIT]: Yup.string().required(),
  [ProblemProperties.MEMORY_LIMIT]: Yup.string().required(),
  // [ProblemProperties.COMPARE_MODE]: Yup.string().required(),
});
