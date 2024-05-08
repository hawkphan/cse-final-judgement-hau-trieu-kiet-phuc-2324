import { Tag } from "../../../shared";

export const renderDifficultyTag = (value: number) => {
  switch (value) {
    case 1:
      return (
        <Tag variant="is-customize" backgroundColor="#D1F5D3" color="#4CAF50">
          Easy
        </Tag>
      );
    case 2:
      return (
        <Tag variant="is-customize" backgroundColor="#FFE082" color="#FF9800">
          Medium
        </Tag>
      );
    case 3:
      return (
        <Tag variant="is-customize" backgroundColor="#FFCDD2" color="#F44336">
          Hard
        </Tag>
      );
    default:
      return (
        <Tag variant="is-customize" backgroundColor="#BBDEFB" color="#2196F3">
          New
        </Tag>
      );
  }
};

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

export enum ProblemFilterQueryKey {
  DIFFICULTY = "difficulty",
  FROM_DATE = "fromDate",
  TO_DATE = "toDate",
  KEYWORDS = "keywords",
}
