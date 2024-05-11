import { Tag } from "../../../shared";

export const renderContestTypeTag = (value: number) => {
  switch (value) {
    case 0:
      return (
        <Tag variant="is-customize" backgroundColor="#D1F5D3" color="#4CAF50">
          Public
        </Tag>
      );
    case 1:
      return (
        <Tag variant="is-customize" backgroundColor="#BBDEFB" color="#2196F3">
          Private
        </Tag>
      );
    default:
      return "--";
  }
};

export const renderContestRule = (value: number) => {
  switch (value) {
    case 0:
      return "ACM/ICPC";
    case 1:
      return "Olympic";
    default:
      return "--";
  }
};

export enum ContestFilterQueryKey {
  KEYWORDS = "keywords",
}
