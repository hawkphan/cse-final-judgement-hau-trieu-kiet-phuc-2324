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
