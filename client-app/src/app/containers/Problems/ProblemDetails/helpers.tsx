import { Tag } from "../../../shared";

export const renderDifficultyTag = (value: string) => {
  switch (value.toLowerCase()) {
    case "easy":
      return (
        <Tag variant="is-customize" backgroundColor="#D1F5D3" color="#4CAF50">
          Easy
        </Tag>
      );
    case "medium":
      return (
        <Tag variant="is-customize" backgroundColor="#FFE082" color="#FF9800">
          Medium
        </Tag>
      );
    case "hard":
      return (
        <Tag variant="is-customize" backgroundColor="#FFCDD2" color="#F44336">
          Hard
        </Tag>
      );
    default:
      return "--";
  }
};

export const languageOptions = [
    {
      label: 'JavaScript',
      value: 1,
    },
    {
      label: 'Java',
      value: 2,
    },
    {
      label: 'Python',
      value: 3,
    },
  ];
