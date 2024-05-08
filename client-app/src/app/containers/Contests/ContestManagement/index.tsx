/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Stack } from "@mui/material";
import { allColumns } from "./allColumns";
import { useNavigate } from "react-router-dom";
import { ProblemFilterQueryKey } from "./helpers";
import { useCallback, useMemo, useState } from "react";
import { useStore } from "../../../shared/common/stores/store";
import { Contest, GetPropertiesParams, useGetContests } from "../../../queries";
import { CustomTableSearch, EmptyTable, Table2 } from "../../../shared";
import ContestDeleteConfirmDialog from "./ContestDeleteConfirmDialog";
import ContestToolbar from "./ContestToolbar";

const ContestManagement = () => {
  const { userStore } = useStore();
  const navigate = useNavigate();
  const user = userStore.user;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const { contests, setParams, isFetching, totalRecords } = useGetContests();

  const onDeleteContest = () => {};

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
      navigate(`/contests/${id}/edit`);
    },
    [navigate]
  );

  const columns = useMemo(
    () =>
      allColumns({
        handleEditContest,
        handleClickOpenDeleteDialog,
        handleSetDeleteId,
      }),
    [handleEditContest]
  );

  const handleGetContests = useCallback(
    (params: GetPropertiesParams) => {
      setParams({ ...params, userId: user?.id });
    },
    [setParams, user?.id]
  );

  return (
    <Container maxWidth="xl">
      <Table2<Contest>
        rowCount={totalRecords}
        columns={columns}
        data={contests}
        onAction={handleGetContests}
        enableTopToolbar={true}
        recordName="items"
        singularRecordName="item"
        state={{
          isLoading: isFetching,
        }}
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
