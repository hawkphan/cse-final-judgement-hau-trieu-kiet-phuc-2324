/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, Stack, Typography } from "@mui/material";
import {
  Accordion,
  CustomTableSearch,
  EmptyTable,
  Table2,
  Text,
  Toastify,
} from "../../../shared";
import {
  API_QUERIES,
  Contest,
  EditContestBody,
  GetPropertiesParams,
  useEditContest,
  useGetContestById,
  useGetContests,
  useGetRegisteredContest,
  useGetUnregisteredContest,
} from "../../../queries";
import { useCallback, useMemo, useState } from "react";
import { allColumns } from "./allColumns";
import UnregisteredListToolbar from "./UnregisteredListToolbar";
import { useStore } from "../../../shared/common/stores/store";
import ContestDialog from "../ContestDialog";

const UnregisteredListView = () => {
  const { userStore } = useStore();
  const user = userStore.user;

  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedContestData, setSelectedContestData] = useState<Contest>();

  const {
    unregisteredContests,
    isFetching,
    setParams,
    totalRecords,
    handleInvalidateUnregisteredContest,
  } = useGetUnregisteredContest();

  const { contest, handleInvalidateContest } = useGetContestById({
    id: selectedContestData?.id,
    queryKey: [API_QUERIES.GET_CONTEST_BY_ID, { id: selectedContestData?.id }],
  });

  const { handleInvalidateContests } = useGetContests();
  const { handleInvalidateRegisteredContest } = useGetRegisteredContest();

  const { onEditContest, isPending: isEditPending } = useEditContest({
    onSuccess: () => {
      Toastify.success("Successful!");
      handleInvalidateContests();
      handleInvalidateContest();
      handleInvalidateUnregisteredContest();
      handleInvalidateRegisteredContest();
      setOpenDetailDialog(false);
    },
    onError: (error) => {
      Toastify.error(error.message);
      console.log("Error", error);
    },
  });

  const handleClickCloseDetailsDialog = () => {
    setOpenDetailDialog(false);
  };

  const handleClickOpenDetailsDialog = (data: Contest) => {
    setOpenDetailDialog(true);
    setSelectedContestData(data);
  };

  const handleRegisterContest = () => {
    contest.members = [...contest.members, { role: 1, userId: user?.id }];
    onEditContest(contest as EditContestBody);
  };

  const columns = useMemo(
    () => allColumns({ onDetail: handleClickOpenDetailsDialog }),
    []
  );

  const handleGetContests = useCallback(
    (params: GetPropertiesParams) => {
      setParams({ ...params, userId: user?.id });
    },
    [setParams, user?.id]
  );

  return (
    <Stack marginTop={2}>
      <Accordion
        title={
          <Typography fontWeight={600} fontSize={18}>
            Other Contests
          </Typography>
        }
        isExpanded
      >
        <Box padding={2}>
          <Card sx={{ paddingLeft: 2, paddingRight: 2, paddingTop: 0 }}>
            <Table2<Contest>
              rowCount={totalRecords}
              columns={columns}
              data={unregisteredContests}
              recordName="items"
              onAction={handleGetContests}
              enableDensityToggle={false}
              enableColumnOrdering={false}
              enableRowActions
              isColumnPinning={true}
              nameColumnPinning="action"
              enableExpanding={true}
              initialState={{
                columnVisibility: {
                  "mrt-row-expand": false,
                },
              }}
              additionalFilterParams={["keywords"]}
              state={{
                isLoading: isFetching,
              }}
              renderTopToolbarCustomActions={() => (
                <Stack direction="row" spacing={1} my={0.5}>
                  <Stack width="240px">
                    <CustomTableSearch
                      placeholder="Search by Name"
                      searchKey="keywords"
                    />
                  </Stack>
                </Stack>
              )}
              renderToolbarInternalActions={({ table }) => {
                return <UnregisteredListToolbar table={table} />;
              }}
              renderFallbackValue={<EmptyTable />}
              muiTopToolbarProps={{
                sx: {
                  backgroundColor: "transparent",
                  mx: "-8px",
                  my: "4px",
                  fontFamily: "Roboto",
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
        onRegister={handleRegisterContest}
        isButtonLoading={isEditPending}
      />
    </Stack>
  );
};

export default UnregisteredListView;
