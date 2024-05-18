import { Box, CardContent, Typography } from "@mui/material";
import parse from "html-react-parser";
import "./styles.scss";
import { API_QUERIES, useGetProblemById } from "../../../../queries";
import { Accordion, formatDateOrNull, Text } from "../../../../shared";
import { renderDifficultyTag } from "../../../Problems/helpers";
import { ProblemDetailProp, ProblemTabProp } from "../helpers";
import { useEffect } from "react";

const ProblemDetail = ({
  id,
  onSetProblem,
  problemList,
}: ProblemDetailProp) => {
  const { problem } = useGetProblemById({
    id: id,
    queryKey: [API_QUERIES.GET_PROBLEM_BY_ID, { id: id }],
  });

  useEffect(() => {
    if (problem != null && onSetProblem) {
      if (!problemList.find((p) => p.id === problem.id)) {
        onSetProblem(problem);
      }
    }
  }, [problem]);

  return (
    <Accordion
      title={
        <Text style={{ fontWeight: "bolder", fontSize: "156px" }}>
          {problem?.code} - {problem?.title}
        </Text>
      }
      isExpanded
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

const ProblemsTab = ({
  problems,
  onSetProblemList,
  problemList,
}: ProblemTabProp) => {
  return (
    <CardContent>
      {!problems
        ? ""
        : problems.map((problem) => {
            return (
              <ProblemDetail
                problemList={problemList}
                key={problem.problemId}
                id={problem.problemId}
                onSetProblem={onSetProblemList}
              />
            );
          })}
    </CardContent>
  );
};

export default ProblemsTab;
