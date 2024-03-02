import { Avatar, Box, CardContent, Typography } from "@mui/material";
import { formatDateOrNull } from "../../../../shared";
import { Problem } from "../../../../queries";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { renderDifficultyTag } from "../../helpers";

const DescriptionTab = ({ problem }: Props) => {
  return (
    <CardContent>
      <Typography variant="h4" mb={2}>
        {problem.code} - {problem.title}
      </Typography>
      {renderDifficultyTag(problem.difficulty)}
      <Typography style={{ marginLeft: "5px", fontSize: "14px", display:"inline" }}>
        Published on {formatDateOrNull(problem.date)}
      </Typography>
      <span
        style={{
          marginLeft: "5px",
          fontSize: "14px",
          fontStyle: "italic",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="body1" marginLeft={1} marginRight={1}>
            Author:
          </Typography>
          <Avatar alt="Avatar" />
          <Typography variant="body2" marginLeft={1}>
            {problem.user.displayName}
          </Typography>
        </Box>
      </span>
      <Box>
        <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
          {problem.description}
        </ReactMarkdown>
      </Box>
    </CardContent>
  );
};

interface Props {
  problem: Problem;
}

export default DescriptionTab;
