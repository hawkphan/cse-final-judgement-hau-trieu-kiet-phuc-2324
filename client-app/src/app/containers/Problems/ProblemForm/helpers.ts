/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accept } from "react-dropzone";
import {
  CreateProblemBody,
  EditProblemBody,
} from "../../../queries/Problems/types";
import { Yup } from "../../../shared";

export const acceptedFileType: Accept = { "application/zip": [".zip"] };

export enum ProblemProperties {
  ID = "id",
  TITLE = "title",
  CODE = "code",
  DESCRIPTION = "description",
  TIME_LIMIT = "timeLimit",
  USER_ID = "userId",
  TEST_CASES_FILE = "file",
}

export const mapFormData = (
  data: CreateProblemBody | EditProblemBody,
  fileSelected: any,
  userId: string,
  isEdit: boolean
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
  formData.append(ProblemProperties.USER_ID, userId);

  return formData;
};

export const CreateProblemFormSchema = Yup.object().shape({
  [ProblemProperties.CODE]: Yup.string().required(),
  [ProblemProperties.TITLE]: Yup.string().required(),
  [ProblemProperties.TIME_LIMIT]: Yup.string().required(),
});
export const EditProblemFormSchema = Yup.object().shape({
  [ProblemProperties.CODE]: Yup.string().required(),
  [ProblemProperties.TITLE]: Yup.string().required(),
  [ProblemProperties.TIME_LIMIT]: Yup.string().required(),
});
