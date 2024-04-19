/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useCallback, useEffect, useMemo } from "react";
import {
  Callback,
  GetPropertiesParams,
  Result,
  useGetResults,
} from "../../../../../queries";
import {
  EmptyTable,
  Table2,
} from "../../../../../shared";
import { allColumns } from "./allColumns";
import ModalClose from "@mui/joy/ModalClose";

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
  solutionId,
}) => {
  const { results, setParams, totalRecords, isFetching } =
    useGetResults();
  const columns = useMemo(() => allColumns(), []);

  useEffect(() => {
    setParams({ solutionId: solutionId, pageSize: -1 });
  }, [isOpen, setParams, solutionId]);

  const handleGetResults = useCallback(
    (params: GetPropertiesParams) => {
      setParams(params);
    },
    [setParams]
  );

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDeleteDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <ModalClose
        variant="plain"
        sx={{ m: 1 }}
        onClick={handleCloseDeleteDialog}
      />
      <DialogTitle fontWeight={"bold"}>Solution Result</DialogTitle>
      <DialogContent>
        <Table2<Result>
          rowCount={totalRecords}
          columns={columns}
          data={results}
          onAction={handleGetResults}
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
          enablePagination={false}
        />
      </DialogContent>
    </Dialog>
  );
};

interface Props {
  isOpen: boolean;
  handleCloseDeleteDialog: Callback;
  solutionId: string;
}

export default SubmissionResultDialog;
