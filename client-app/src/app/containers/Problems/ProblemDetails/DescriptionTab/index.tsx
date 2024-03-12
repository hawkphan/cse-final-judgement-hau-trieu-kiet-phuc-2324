import { Avatar, Box, CardContent, Typography } from "@mui/material";
import { formatDateOrNull } from "../../../../shared";
import { Problem } from "../../../../queries";
import parse from 'html-react-parser';
import { renderDifficultyTag } from "../../helpers";
import './styles.scss';

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
      <div
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
      </div>
      <Box overflow={"auto"}>
        <div className="description">{parse(problem.description)}</div>
      </Box>
    </CardContent>
  );
};

interface Props {
  problem: Problem;
}

export default DescriptionTab;
