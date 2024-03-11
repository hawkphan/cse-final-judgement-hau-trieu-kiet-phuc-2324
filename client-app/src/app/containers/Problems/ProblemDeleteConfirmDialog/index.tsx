/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import { Callback } from "../../../queries";
import { Button } from "../../../shared";

const ProblemDeleteConfirmDialog: React.FC<Props> = ({
  openDeleteDialog,
  deleteId,
  handleCloseDeleteDialog,
  onDeleteProblem,
}) => {
  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Dialog
      open={openDeleteDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDeleteDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle fontWeight={"bold"}>
        Are you sure to delete this problem?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          All related records of test cases and submission in the system will be
          removed after this deletion. The action can not be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeleteDialog} variant="grey">
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
  );
};

interface Props {
  openDeleteDialog: boolean;
  handleCloseDeleteDialog: Callback;
  deleteId: string;
  onDeleteProblem: (id: string) => void;
}

export default ProblemDeleteConfirmDialog;
