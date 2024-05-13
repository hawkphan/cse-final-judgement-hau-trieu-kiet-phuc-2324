/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Stack } from "@mui/material";
import {
  CustomTableSearch,
  EmptyTable,
  MuiSwitch,
  Table2,
  Toastify,
} from "../../shared";
import { allColumns } from "./allColumns";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../shared/common/stores/store";
import {
  GetPropertiesParams,
  Problem,
  useDeleteProblem,
  useGetProblems,
} from "../../queries";
import { ProblemFilterQueryKey } from "./helpers";
import ProblemToolbar from "./ProblemToolbar";
import ProblemDeleteConfirmDialog from "./ProblemDeleteConfirmDialog";
import { useCallback, useMemo, useState } from "react";

const Problems = () => {
  const { userStore } = useStore();
  const navigate = useNavigate();
  const user = userStore.user;

  const {
    problems,
    totalRecords,
    setParams,
    isFetching,
    params,
    handleInvalidateProblems,
  } = useGetProblems();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isOnlyDedication, setIsOnlyDedication] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const { onDeleteProblem } = useDeleteProblem({
    onSuccess: () => {
      Toastify.success("Successfully");
      handleInvalidateProblems();
    },
    onError: (error) => {
      Toastify.error(error.toString());
    },
  });

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleChangeIsOnlyDedication = useCallback(() => {
    setParams({ ...params, isOnly: !isOnlyDedication, userId: user?.id });
    setIsOnlyDedication(!isOnlyDedication);
  }, [isOnlyDedication, params, setParams, user?.id]);

  const handleGetProblems = useCallback(
    (params: GetPropertiesParams) => {
      setParams({ ...params, isOnly: isOnlyDedication, userId: user?.id });
    },
    [isOnlyDedication, setParams, user?.id]
  );

  const handleNavigateToDetail = (id: string) => {
    navigate(id);
  };

  const handleSetDeleteId = (id: string) => {
    setDeleteId(id);
  };

  const handleEditProblem = useCallback(
    (id: string) => {
      navigate(`/problems/${id}/edit`);
    },
    [navigate]
  );

  const columns = useMemo(
    () =>
      allColumns({
        handleEditProblem,
        handleClickOpenDeleteDialog,
        handleSetDeleteId,
        userId: user?.id,
      }),
    [handleEditProblem, user?.id]
  );

  return (
    <Container maxWidth="xl">
      <Table2<Problem>
        rowCount={totalRecords}
        columns={columns}
        data={problems}
        onAction={handleGetProblems}
        enableTopToolbar={true}
        recordName="items"
        singularRecordName="item"
        enableDensityToggle={false}
        enableColumnOrdering={false}
        enableRowActions
        paginationDisplayMode="pages"
        isColumnPinning={false}
        nameColumnPinning="actions"
        state={{
          isLoading: isFetching,
        }}
        additionalFilterParams={[
          ProblemFilterQueryKey.FROM_DATE,
          ProblemFilterQueryKey.TO_DATE,
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
              onChange={handleChangeIsOnlyDedication}
              checked={isOnlyDedication}
            />
          </Stack>
        )}
        renderToolbarInternalActions={({ table }) => {
          return (
            <ProblemToolbar
              table={table}
              canCreate={
                userStore?.user?.roles?.includes("Author") ||
                userStore?.user?.roles?.includes("Admin")
              }
            />
          );
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
      <ProblemDeleteConfirmDialog
        openDeleteDialog={openDeleteDialog}
        deleteId={deleteId}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        onDeleteProblem={onDeleteProblem}
      />
    </Container>
  );
};

export default Problems;
