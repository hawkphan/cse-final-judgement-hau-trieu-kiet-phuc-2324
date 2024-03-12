import { Tag } from "../../../../shared";

export const renderStatusTag = (value: number) => {
    switch (value) {
      case 0:
        return (
          <Tag variant="is-customize" backgroundColor="#4CAF50" color="#FFFFFF">
            Accepted (AC)
          </Tag>
        );
      case 1:
        return (
          <Tag variant="is-customize" backgroundColor="#F44336" color="#FFFFFF">
            Wrong Answer (WA)
          </Tag>
        );
      case 2:
        return (
          <Tag variant="is-customize" backgroundColor="#FFC107" color="#FFFFFF">
            Time Limit Exceeded (TLE)
          </Tag>
        );
      case 3:
        return (
          <Tag variant="is-customize" backgroundColor="#FF9800" color="#FFFFFF">
            Memory Limit Exceeded (MLE)
          </Tag>
        );
      case 4:
        return (
          <Tag variant="is-customize" backgroundColor="#E91E63" color="#FFFFFF">
            Runtime Error (RE)
          </Tag>
        );
      case 5:
        return (
          <Tag variant="is-customize" backgroundColor="#9C27B0" color="#FFFFFF">
            Compile Error (CE)
          </Tag>
        );
      case 6:
        return (
          <Tag variant="is-customize" backgroundColor="#2196F3" color="#FFFFFF">
            Partial Accepted (Partial AC)
          </Tag>
        );
      case 7:
        return (
          <Tag variant="is-customize" backgroundColor="#3F51B5" color="#FFFFFF">
            Presentation Error (PE)
          </Tag>
        );
      case 8:
        return (
          <Tag variant="is-customize" backgroundColor="#795548" color="#FFFFFF">
            Submission Error (SE)
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
  