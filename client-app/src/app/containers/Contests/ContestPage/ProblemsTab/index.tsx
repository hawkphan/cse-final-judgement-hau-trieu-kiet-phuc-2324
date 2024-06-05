import { Box, CardContent, Typography } from "@mui/material";
import parse from "html-react-parser";
import "./styles.scss";
import { ContestProblem, Problem } from "../../../../queries";
import { Accordion, formatDateOrNull, isEmpty, Text } from "../../../../shared";
import { renderDifficultyTag } from "../../../Problems/helpers";
import { compareOrder } from "../../ContestManagement/ContestForm/helpers";

const ProblemDetail = ({ problem }: Props) => {
  return (
    <Accordion
      title={
        <Text style={{ fontWeight: "bolder", fontSize: "156px" }}>
          {problem?.code} - {problem?.title}
        </Text>
      }
      isExpanded={false}
    >
      <Box
        sx={{
          border: "1px solid blue",
          borderRadius: "15px",
          paddingTop: "20px",
        }}
      >
        <div style={{ marginLeft: 20 }}>
          {renderDifficultyTag(problem?.difficulty)}
          <Typography
            style={{ marginLeft: "5px", fontSize: "14px", display: "inline" }}
          >
            Published on {formatDateOrNull(problem?.date)}
          </Typography>
          <Box overflow={"auto"}>
            <div className="description">
              {parse(problem?.description ?? "")}
            </div>
          </Box>
        </div>
      </Box>
    </Accordion>
  );
};

const ProblemsTab = ({ problems }: ProblemTabProp) => {
  problems = problems?.sort(compareOrder);
  return (
    <CardContent>
      {!isEmpty(problems)
        ? problems.map((problem) => {
            return (
              <ProblemDetail
                key={problem.problemId}
                problem={problem.problem}
              />
            );
          })
        : ""}
    </CardContent>
  );
};
export interface Props {
  problem?: Problem;
}

export interface ProblemTabProp {
  problems: ContestProblem[];
}

export default ProblemsTab;
