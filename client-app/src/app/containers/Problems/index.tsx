/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Stack } from "@mui/material";
import { Button, CustomTableSearch, EmptyTable, Table2 } from "../../shared";
import { allColumns } from "./allColumns";
import { GetPropertiesParams, Problem } from "../../queries/Problems/types";
import { useNavigate } from "react-router-dom";
import { useGetProblems } from "../../queries/Problems/useGetProblems";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import { PATHS } from "../../configs/paths";
import { forwardRef, useState } from "react";
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Problems = () => {
  const { problems, totalRecords, setParams, isFetching } = useGetProblems();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };


  const navigate = useNavigate();

  const handleGetProblems = (params: GetPropertiesParams) => {
    setParams(params);
  };

  const handleNavigateToDetail = (id: string) => {
    navigate(id);
  };

  const handleEditProblem = (id: string) => {
    navigate(`/problems/${id}/edit`)
  }

  const columns = allColumns({handleEditProblem, handleClickOpenDeleteDialog});
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
        additionalFilterParams={["keywords"]}
        nameColumnPinning="actions"
        state={{
          isLoading: isFetching,
        }}
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
        renderToolbarInternalActions={() => {
          return (
            <Stack>
              <Button
                className="btn btn-primary"
                icon={<PostAddRoundedIcon fontSize="medium" />}
                style={{ fontFamily: "Roboto", marginTop: "6px" }}
                onClick={() => navigate(PATHS.createProblem)}
              >
                New
              </Button>
            </Stack>
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
      <Dialog
        open={openDeleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDeleteDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{color: 'red'}}>{"Are you sure to delete this problem?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Other people will be notified about this problem deletion status before it will be completely removed in the next 15 days. The action can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} style={{backgroundColor: 'gray'}}>Cancel</Button>
          <Button onClick={handleCloseDeleteDialog} style={{backgroundColor: 'red'}}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Problems;
