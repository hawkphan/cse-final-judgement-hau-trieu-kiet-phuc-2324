import { Box, CardContent, Typography } from "@mui/material";
import { Link, formatDateOrNull } from "../../../../shared";
import { Problem } from "../../../../queries";
import parse from "html-react-parser";
import { renderDifficultyTag } from "../../helpers";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../../configs/paths";

const DescriptionTab = ({ problem }: Props) => {
  const navigate = useNavigate();

  const handleNavigateToUserProfile = (id: string) => {
    navigate(PATHS.profile.replace(":id", id));
  };

  return (
    <CardContent>
      <Typography variant="h5" mb={2}>
        {problem.code} - {problem.title}
      </Typography>
      {renderDifficultyTag(problem.difficulty)}
      <Typography
        style={{ marginLeft: "5px", fontSize: "14px", display: "inline" }}
      >
        Published on {formatDateOrNull(problem.date)} by{" "}
        <Link onClick={() => handleNavigateToUserProfile(problem.user.id)}>
          {problem.user.displayName}
        </Link>
      </Typography>
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
