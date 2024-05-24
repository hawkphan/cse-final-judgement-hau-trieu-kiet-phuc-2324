import { Stack } from "@mui/material";
import { LoadingCommon, Tag } from "../../../../shared";

export const renderStatusTag = (value: number) => {
  let backgroundColor;
  let color;
  let description;

  switch (value) {
    case 1: // In Queue
      backgroundColor = "#BBDEFB";
      color = "#2196F3";
      description = "In Queue";
      break;
    case 2: // Processing
      backgroundColor = "#BBDEFB";
      color = "#2196F3";
      description = "Processing";
      break;
    case 3: // Accepted
      backgroundColor = "#4CAF50";
      color = "#FFFFFF";
      description = "Accepted";
      break;
    case 4: // Wrong Answer
      backgroundColor = "#F44336";
      color = "#FFFFFF";
      description = "Wrong Answer";
      break;
    case 5: // Time Limit Exceeded
      backgroundColor = "#FFC107";
      color = "#FFFFFF";
      description = "Time Limit Exceeded";
      break;
    case 6: // Compilation Error
      backgroundColor = "#FF9800";
      color = "#FFFFFF";
      description = "Compilation Error";
      break;
    case 7: // Runtime Error (SIGSEGV)
      backgroundColor = "#E91E63";
      color = "#FFFFFF";
      description = "Runtime Error (SIGSEGV)";
      break;
    case 8: // Runtime Error (SIGXFSZ)
      backgroundColor = "#E91E63";
      color = "#FFFFFF";
      description = "Runtime Error (SIGXFSZ)";
      break;
    case 9: // Runtime Error (SIGFPE)
      backgroundColor = "#E91E63";
      color = "#FFFFFF";
      description = "Runtime Error (SIGFPE)";
      break;
    case 10: // Runtime Error (SIGABRT)
      backgroundColor = "#E91E63";
      color = "#FFFFFF";
      description = "Runtime Error (SIGABRT)";
      break;
    case 11: // Runtime Error (NZEC)
      backgroundColor = "#E91E63";
      color = "#FFFFFF";
      description = "Runtime Error (NZEC)";
      break;
    case 12: // Runtime Error (Other)
      backgroundColor = "#E91E63";
      color = "#FFFFFF";
      description = "Runtime Error (Other)";
      break;
    case 13: // Internal Error
      backgroundColor = "#9C27B0";
      color = "#FFFFFF";
      description = "Internal Error";
      break;
    case 14: // Exec Format Error
      backgroundColor = "#9C27B0";
      color = "#FFFFFF";
      description = "Exec Format Error";
      break;
    default:
      backgroundColor = "#BBDEFB";
      color = "#2196F3";
      description = "---";
      break;
  }

  return (
    <Stack direction={"row"} gap={2} alignContent={"baseline"}>
      {[1, 2].includes(value) && (
        <LoadingCommon style={{ paddingBottom: "5px" }} />
      )}
      <Tag
        variant="is-customize"
        backgroundColor={backgroundColor}
        color={color}
      >
        {description}
      </Tag>
    </Stack>
  );
};
