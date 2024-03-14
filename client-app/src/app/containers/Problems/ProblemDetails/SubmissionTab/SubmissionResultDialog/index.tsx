/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useMemo } from "react";
import { Callback, Result } from "../../../../../queries";
import { Button, EmptyTable, Table2 } from "../../../../../shared";
import { allColumns } from "./allColumns";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SubmissionResultDialog: React.FC<Props> = ({
  isOpen,
  handleCloseDeleteDialog,
  data,
}) => {

    const columns = useMemo(() => allColumns(), []);

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDeleteDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle fontWeight={"bold"}>
        Solution Result
      </DialogTitle>
      <DialogContent>
        <Table2<Result>
          rowCount={data?.length}
          columns={columns}
          data={data}
          onAction={() => {}}
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
            isLoading: false,
          }}
          renderFallbackValue={<EmptyTable />}
          renderToolbarInternalActions={() => {
            return <></>;
          }}
          muiTopToolbarProps={{
            sx: {
              backgroundColor: "transparent",
              mx: "-8px",
              my: "-30px",
              fontFamily: "Roboto",
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeleteDialog} variant="grey">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface Props {
  isOpen: boolean;
  handleCloseDeleteDialog: Callback;
  data: Result[];
}

export default SubmissionResultDialog;
