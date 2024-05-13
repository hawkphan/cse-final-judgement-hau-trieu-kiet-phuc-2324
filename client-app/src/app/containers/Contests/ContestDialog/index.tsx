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
import { Button, emptyFunction, isEmpty } from "../../../shared";
import { Callback, Contest } from "../../../queries";
import parse from "html-react-parser";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContestDialog: React.FC<Props> = ({
  open,
  data,
  onClose,
  isJoining = false,
  onJoin = emptyFunction,
  onRegister = emptyFunction,
  isButtonLoading = false,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle fontWeight={"bold"}>{data?.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {parse(!isEmpty(data) ? data?.description : "<div></div>")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="grey">
          Cancel
        </Button>
        {isJoining ? (
          <Button
            isLoading={isButtonLoading}
            onClick={() => {
              onJoin(data?.id);
              onClose();
            }}
          >
            Join
          </Button>
        ) : (
          <Button
            isLoading={isButtonLoading}
            onClick={() => {
              onRegister();
            }}
          >
            Register
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

interface Props {
  open: boolean;
  onClose: Callback;
  onJoin?: Callback;
  onRegister?: Callback;
  data: Contest;
  isJoining?: boolean;
  isButtonLoading?: boolean;
}

export default ContestDialog;
