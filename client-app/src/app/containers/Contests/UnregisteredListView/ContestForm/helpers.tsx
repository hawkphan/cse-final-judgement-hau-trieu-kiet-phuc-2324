import { PATHS } from "../../../../configs/paths";

export const toBreadCrumbs = (isEdit: boolean, id?: string) => {
  return [
    {
      id: 0,
      label: "Contest",
      href: `${PATHS.contests}`,
    },
    {
      id: 1,
      label: isEdit ? "Edit " + id : "Create",
    },
  ];
};
