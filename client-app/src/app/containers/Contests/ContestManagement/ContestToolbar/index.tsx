import { MRT_TableInstance } from "material-react-table";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { IoMdRefresh } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import {
  Contest,
  useGetContests,
} from "../../../../queries";
import {
  Button,
  COLOR_CODE,
  CustomTableColumnOptions,
  CustomTableColumnOptionsModal,
} from "../../../../shared";
import { PATHS } from "../../../../configs/paths";

type Props = {
  table: MRT_TableInstance<Contest>;
  canCreate?: boolean;
};

const ContestToolbar = ({ table, canCreate = true }: Props) => {
  const navigate = useNavigate();
  const { handleInvalidateContests } = useGetContests();

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
              onClick={handleInvalidateContests}
            >
              <IoMdRefresh size={20} color={COLOR_CODE.GREY_800} />
            </IconButton>
          </Tooltip>
          {/* <CustomTableFilterContainer
            filterParamsKeys={[ContestFilterQueryKey.KEYWORDS]}
          >
            <ContestFilter />
          </CustomTableFilterContainer> */}
          <CustomTableColumnOptions>
            <Tooltip title="Column Options" arrow placement="top">
              <CustomTableColumnOptionsModal table={table} />
            </Tooltip>
          </CustomTableColumnOptions>
          {canCreate && (
            <Button
              className="btn btn-primary"
              icon={<PostAddRoundedIcon fontSize="medium" />}
              style={{ fontFamily: "Roboto", marginTop: "6px" }}
              onClick={() => navigate(PATHS.createContest)}
            >
              New
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContestToolbar;
