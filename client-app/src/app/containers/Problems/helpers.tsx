import { Tag } from "../../shared";

export const renderDifficultyTag = (value: number) => {
  if (value <= 1000) {
    return (
      <Tag variant="is-customize" backgroundColor="#D1F5D3" color="#4CAF50">
        {Math.round(value)}
      </Tag>
    );
  }

  if (value > 1000 && value <= 2000) {
    return (
      <Tag variant="is-customize" backgroundColor="#FFE082" color="#FF9800">
        {Math.round(value)}
      </Tag>
    );
  }

  if (value > 2000) {
    return (
      <Tag variant="is-customize" backgroundColor="#FFCDD2" color="#F44336">
        {Math.round(value)}
      </Tag>
    );
  }

  return (
    <Tag variant="is-customize" backgroundColor="#BBDEFB" color="#2196F3">
      --
    </Tag>
  );
};

export enum ProblemFilterQueryKey {
  DIFFICULTY = "difficulty",
  FROM_DATE = "fromDate",
  TO_DATE = "toDate",
  KEYWORDS = "keywords",
}
