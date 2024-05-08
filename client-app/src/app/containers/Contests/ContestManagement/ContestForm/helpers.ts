import { PATHS } from "../../../../configs/paths";
import { Yup } from "../../../../shared";
import { SelectOption } from "../../../../shared/components/common/MuiAutoComplete";

export const toBreadCrumbs = (isEdit: boolean, id?: string) => {
  return [
    {
      id: 0,
      label: "Contest",
      href: `${PATHS.contestManagement}`,
    },
    {
      id: 1,
      label: isEdit ? "Edit " + id : "Create",
    },
  ];
};

export const renderRole = (value: number) => {
  if (value === 0) {
    return "Admin";
  }

  if (value === 1) {
    return "Contestant";
  }

  return "--";
};

export enum ContestProperties {
  ID = "id",
  NAME = "name",
  DESCRIPTION = "description",
  TYPE = "type",
  RULE = "rule",
  START_TIME = "startTime",
  END_TIME = "endTime",
  PROBLEMS = "problems",
  MEMBERS = "members",
}

export const contestTypeOptions: SelectOption[] = [
  { label: "Public", value: "0" },
  { label: "Private", value: "1" },
];

export const contestRuleOptions: SelectOption[] = [
  { label: "ACM/ICPC", value: "0" },
  { label: "Olympic", value: "1" },
];

export const CreateContestFormSchema = Yup.object().shape({
  [ContestProperties.NAME]: Yup.string().required(),
  [ContestProperties.START_TIME]: Yup.date().required(),
  [ContestProperties.END_TIME]: Yup.date().required(),
  [ContestProperties.TYPE]: Yup.string().required(),
  [ContestProperties.RULE]: Yup.string().required(),
});

export const EditContestFormSchema = Yup.object().shape({
  [ContestProperties.NAME]: Yup.string().required(),
  [ContestProperties.START_TIME]: Yup.date().required(),
  [ContestProperties.END_TIME]: Yup.date().required(),
  [ContestProperties.TYPE]: Yup.string().required(),
  [ContestProperties.RULE]: Yup.string().required(),
});
