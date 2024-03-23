import { MRT_TableInstance } from "material-react-table";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { IoMdRefresh } from "react-icons/io";
import {
  COLOR_CODE,
  CustomTableColumnOptions,
  CustomTableColumnOptionsModal,
} from "../../../../shared";
import { Contest, useGetRegisteredContest } from "../../../../queries";

type Props = {
  table: MRT_TableInstance<Contest>;
};

const RegisteredListToolbar = ({ table }: Props) => {
  const { handleInvalidateRegisteredContest } = useGetRegisteredContest();

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
              onClick={handleInvalidateRegisteredContest}
            >
              <IoMdRefresh size={20} color={COLOR_CODE.GREY_800} />
            </IconButton>
          </Tooltip>
          <CustomTableColumnOptions>
            <Tooltip title="Column Options" arrow placement="top">
              <CustomTableColumnOptionsModal table={table} />
            </Tooltip>
          </CustomTableColumnOptions>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RegisteredListToolbar;
