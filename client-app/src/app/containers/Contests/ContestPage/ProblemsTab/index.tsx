import { Box, CardContent, Typography } from "@mui/material";
import parse from "html-react-parser";
import "./styles.scss";
import { renderDifficultyTag } from "./helpers";
import { Problem } from "../../../../queries";
import { Accordion, formatDateOrNull, Text } from "../../../../shared";
import { ContestProblemsData } from "../data.mock";

const ProblemDetail = ({ problem }: Props) => {
  const descriptions = problem.description.split("\n\n");
  return (
    <Accordion title={<Text>{problem.title}</Text>} isExpanded>
      <div style={{ marginLeft: 20 }}>
        {renderDifficultyTag(problem.difficulty)}
        <Typography
          style={{ marginLeft: "5px", fontSize: "14px", display: "inline" }}
        >
          Published on {formatDateOrNull(problem.date)}
        </Typography>
        <Box overflow={"auto"}>
          <div className="description">
            {!descriptions
              ? ""
              : descriptions.map((description) => {
                  if (
                    description.includes("Description") ||
                    description.includes("Input Format") ||
                    description.includes("Output Format") ||
                    description.includes("Constrains") ||
                    description.includes("Explanation ")
                  ) {
                    return (
                      <div
                        style={{
                          marginBottom: "15px",
                          fontWeight: "bolder",
                          fontSize: "16px",
                        }}
                      >
                        {parse(description)}
                      </div>
                    );
                  } else {
                    return (
                      <div style={{ marginBottom: "15px" }}>
                        {parse(description)}
                      </div>
                    );
                  }
                })}
          </div>
        </Box>
      </div>
    </Accordion>
  );
};

const ProblemsTab = () => {
  const contest = ContestProblemsData;

  return (
    <CardContent>
      {!contest
        ? ""
        : contest.problems.map((problem) => {
            return <ProblemDetail problem={problem} />;
          })}
    </CardContent>
  );
};

interface Props {
  problem: Problem;
}

export default ProblemsTab;
