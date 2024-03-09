import { MRT_TableInstance } from "material-react-table";
import { Problem, useGetProblems } from "../../../queries";
import { IconButton, Stack, Tooltip } from "@mui/material";
import {
  Button,
  COLOR_CODE,
  CustomTableColumnOptions,
  CustomTableColumnOptionsModal,
  CustomTableFilterContainer,
} from "../../../shared";
import { ProblemFilterQueryKey } from "../helpers";
import { IoMdRefresh } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import { PATHS } from "../../../configs/paths";
import ProblemFilter from "./ProblemFilter";

type Props = {
  table: MRT_TableInstance<Problem>;
};

const ProblemToolbar = ({ table }: Props) => {
  const navigate = useNavigate();
  const { handleInvalidateProblems } = useGetProblems();

  return (
    <Stack direction="column" mb={1}>
      <Stack direction="row" mb={1} justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center">
          <Tooltip placement="top" arrow title="Refresh">
            <IconButton
              sx={{
                color: COLOR_CODE.HEADER,
                background: COLOR_CODE.DISABLED_INPUT,
                p: "10px",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: COLOR_CODE.BG_SURFACE_HOVER,
                },
              }}
              onClick={handleInvalidateProblems}
            >
              <IoMdRefresh size={20} color={COLOR_CODE.GREY_800} />
            </IconButton>
          </Tooltip>
          <CustomTableFilterContainer
            filterParamsKeys={[
              ProblemFilterQueryKey.FROM_DATE,
              ProblemFilterQueryKey.TO_DATE,
              ProblemFilterQueryKey.DIFFICULTY,
              ProblemFilterQueryKey.KEYWORDS,
            ]}
          >
            <ProblemFilter />
          </CustomTableFilterContainer>
          <CustomTableColumnOptions>
            <Tooltip title="Column Options" arrow placement="top">
              <CustomTableColumnOptionsModal table={table} />
            </Tooltip>
          </CustomTableColumnOptions>
          <Button
            className="btn btn-primary"
            icon={<PostAddRoundedIcon fontSize="medium" />}
            style={{ fontFamily: "Roboto", marginTop: "6px" }}
            onClick={() => navigate(PATHS.createProblem)}
          >
            New
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProblemToolbar;
