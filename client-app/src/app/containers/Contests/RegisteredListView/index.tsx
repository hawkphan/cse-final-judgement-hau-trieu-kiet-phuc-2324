/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, Stack } from "@mui/material";
import { Accordion, EmptyTable, Table2, Text } from "../../../shared";
import {
  Contest,
  GetPropertiesParams,
  useGetRegisteredContest,
} from "../../../queries";
import { useCallback, useMemo, useState } from "react";
import { allColumns } from "./allColumns";
import RegisteredListToolbar from "./RegisteredListToolbar";
import { useStore } from "../../../shared/common/stores/store";
import ContestDialog from "../ContestDialog";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../configs/paths";

const RegisteredListView = () => {
  const { userStore } = useStore();
  const user = userStore.user;
  const navigate = useNavigate();

  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedContestData, setSelectedContestData] = useState<Contest>();

  const { registeredContests, isFetching, setParams, totalRecords } =
    useGetRegisteredContest();

  const handleGetContests = useCallback(
    (params: GetPropertiesParams) => {
      setParams({ ...params, userId: user?.id, pageSize: -1 });
    },
    [setParams, user?.id]
  );

  const handleClickOpenDetailsDialog = (data: Contest) => {
    setOpenDetailDialog(true);
    setSelectedContestData(data);
  };

  const handleClickCloseDetailsDialog = () => {
    setOpenDetailDialog(false);
  };

  const handleJoinContest = (id: string) => {
    navigate(PATHS.contestPage.replace(":id", id));
  };

  const columns = useMemo(
    () => allColumns({ onDetail: handleClickOpenDetailsDialog }),
    []
  );

  return (
    <Stack marginTop={2}>
      <Accordion title={<Text>Your Schedule</Text>} isExpanded>
        <Box padding={2}>
          <Card sx={{ paddingLeft: 2, paddingRight: 2, paddingTop: 0 }}>
            <Table2<Contest>
              rowCount={totalRecords}
              columns={columns}
              data={registeredContests}
              recordName="items"
              onAction={handleGetContests}
              enableDensityToggle={false}
              enableColumnOrdering={false}
              enableRowActions
              isColumnPinning={true}
              nameColumnPinning="action"
              enablePagination={false}
              enableExpanding={true}
              initialState={{
                columnVisibility: {
                  "mrt-row-expand": false,
                },
              }}
              state={{
                isLoading: isFetching,
              }}
              renderToolbarInternalActions={({ table }) => {
                return <RegisteredListToolbar table={table} />;
              }}
              renderFallbackValue={<EmptyTable />}
              muiTopToolbarProps={{
                sx: {
                  backgroundColor: "transparent",
                },
              }}
            />
          </Card>
        </Box>
      </Accordion>
      <ContestDialog
        onClose={handleClickCloseDetailsDialog}
        data={selectedContestData}
        open={openDetailDialog}
        isJoining
        onJoin={handleJoinContest}
      />
    </Stack>
  );
};

export default RegisteredListView;
