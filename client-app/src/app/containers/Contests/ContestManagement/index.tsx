/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Stack } from "@mui/material";
import { allColumns } from "./allColumns";
import { useNavigate } from "react-router-dom";
import { ProblemFilterQueryKey } from "./helpers";
import { useCallback, useMemo, useState } from "react";
import { useStore } from "../../../shared/common/stores/store";
import { Contest, GetPropertiesParams } from "../../../queries";
import { contests } from "./data.mock";
import { CustomTableSearch, EmptyTable, MuiSwitch, Table2 } from "../../../shared";
import ContestDeleteConfirmDialog from "./ContestDeleteConfirmDialog";
import ContestToolbar from "./ContestToolbar";

const ContestManagement = () => {
  const { userStore } = useStore();
  const navigate = useNavigate();
  const user = userStore.user;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isOnlyDedication, setIsOnlyDedication] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const onDeleteContest = () => {}

  const handleGetContests = useCallback(
    (params: GetPropertiesParams) => {
      // setParams({ ...params, isOnly: isOnlyDedication, userId: user?.id });
    },
    [isOnlyDedication,  user?.id]
  );

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleNavigateToDetail = (id: string) => {
    navigate(id);
  };

  const handleSetDeleteId = (id: string) => {
    setDeleteId(id);
  };

  const handleEditContest = useCallback(
    (id: string) => {
      // navigate(`/problems/${id}/edit`);
    },
    [navigate]
  );

  const columns = useMemo(
    () =>
      allColumns({
        handleEditContest,
        handleClickOpenDeleteDialog,
        handleSetDeleteId
      }),
    [handleEditContest]
  );

  return (
    <Container maxWidth="xl">
      <Table2<Contest>
        rowCount={10}
        columns={columns}
        data={contests}
        onAction={handleGetContests}
        enableTopToolbar={true}
        recordName="items"
        singularRecordName="item"
        enableDensityToggle={false}
        enableColumnOrdering={false}
        enableRowActions
        paginationDisplayMode="pages"
        isColumnPinning={false}
        nameColumnPinning="actions"
        additionalFilterParams={[
          ProblemFilterQueryKey.FROM_DATE,
          ProblemFilterQueryKey.TO_DATE,
          ProblemFilterQueryKey.DIFFICULTY,
          ProblemFilterQueryKey.KEYWORDS,
        ]}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            handleNavigateToDetail(row.original.id);
          },
        })}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={1} my={0.5}>
            <Stack width="328px">
              <CustomTableSearch
                placeholder="Search by Title"
                searchKey="keywords"
              />
            </Stack>
            <MuiSwitch
              label="Only own posts"
              isShowDescription={false}
              checked={isOnlyDedication}
            />
          </Stack>
        )}
        renderToolbarInternalActions={({ table }) => {
          return <ContestToolbar table={table} />;
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
      <ContestDeleteConfirmDialog
        openDeleteDialog={openDeleteDialog}
        deleteId={deleteId}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        onDeleteContest={onDeleteContest}
      />
    </Container>
  );
};

export default ContestManagement;
