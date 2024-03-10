/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import {
  Button,
  CustomTableSearch,
  EmptyTable,
  MuiSwitch,
  Table2,
  Toastify,
} from "../../shared";
import { allColumns } from "./allColumns";
import { useNavigate } from "react-router-dom";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useStore } from "../../shared/common/stores/store";
import {
  Problem,
  useDeleteProblem,
  useGetProblems,
} from "../../queries/Problems";
import { GetPropertiesParams } from "../../queries";
import { ProblemFilterQueryKey } from "./helpers";
import ProblemToolbar from "./ProblemToolbar";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
              label="Only your posts"
              isShowDescription={false}
              onChange={handleChangeIsOnlyDedication}
              checked={isOnlyDedication}
            />
          </Stack>
        )}
        renderToolbarInternalActions={({ table }) => {
          return <ProblemToolbar table={table} />;
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
      <Dialog
        open={openDeleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDeleteDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle fontWeight={'bold'}>
          Are you sure to delete this problem?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            All related records of test cases and submission in the system will be removed after this deletion. The action
            can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteDialog}
            variant="grey"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDeleteProblem(deleteId);
              handleCloseDeleteDialog();
            }}
            variant="danger"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Problems;
