import { Box, CardContent,  Typography } from "@mui/material";
import parse from "html-react-parser";
import "./styles.scss";
import { API_QUERIES, Contest, useGetProblemById } from "../../../../queries";
import { Accordion, formatDateOrNull, Text } from "../../../../shared";
import { renderDifficultyTag } from "../../../Problems/helpers";

interface Problem {
  id: string;
}

const ProblemDetail = ({ id }: Problem) => {
  const { problem } = useGetProblemById({
    id: id,
    queryKey: [API_QUERIES.GET_PROBLEM_BY_ID, { id: id }],
  });
  return (
    <Accordion title={<Text>{problem?.title}</Text>} isExpanded>
      <div style={{ marginLeft: 20 }}>
        {renderDifficultyTag(problem?.difficulty)}
        <Typography
          style={{ marginLeft: "5px", fontSize: "14px", display: "inline" }}
        >
          Published on {formatDateOrNull(problem?.date)}
        </Typography>
        <Box overflow={"auto"}>
          <div className="description">{parse(problem?.description ?? '')}</div>
        </Box>
      </div> 
    </Accordion>
  );
};

const ProblemsTab = ({ problems }: Contest) => {
  return (
    <CardContent>
      {!problems
        ? ""
        : problems.map((problem) => {
            return <ProblemDetail id={problem.problemId} />;
          })}
    </CardContent>
  );
};

export default ProblemsTab;
