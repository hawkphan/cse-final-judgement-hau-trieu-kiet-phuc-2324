import { Box, CardContent } from "@mui/material";
import { EmptyTable, Table2 } from "../../../../shared";
import {
  GetPropertiesParams,
  Solution,
  useGetSolutions,
} from "../../../../queries";
import { useCallback, useEffect, useMemo, useState } from "react";
import { allColumns } from "./allColumns";
import SubmissionResultDialog from "./SubmissionResultDialog";

const SubmissionTab = ({ userId, problemId }: Props) => {
  const DELAY_MS = 5000;

  const columns = useMemo(() => allColumns(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>();

  const {
    solutions,
    totalRecords,
    isFetching,
    setParams: setSolutionParams,
    handleInvalidateSolutions,
    onGetSolutions,
  } = useGetSolutions();

  const handleCloseResult = () => {
    setIsOpen(false);
  };

  const handleGetSolutions = useCallback(
    (params: GetPropertiesParams) => {
      setSolutionParams({ ...params, userId: userId, problemId: problemId });
    },
    [problemId, setSolutionParams, userId]
  );

  useEffect(() => {
    const hasPendingStatus = solutions.some(
      (solution) => solution.status === 1 || solution.status === 2
    );
    const timerId = setTimeout(() => {
      if (hasPendingStatus) {
        handleInvalidateSolutions();
        onGetSolutions();
      }
    }, DELAY_MS);
  
    return () => {
      clearTimeout(timerId);
    };
  }, [solutions, handleInvalidateSolutions, isFetching, onGetSolutions]);

  useEffect(() => {
    setSolutionParams({ userId: userId, problemId: problemId });
  }, [problemId, setSolutionParams, userId]);

  return (
    <CardContent>
      <Box
        component="div"
        sx={{
          backgroundColor: "transparent",
          mx: "-8px",
          my: "4px",
          fontFamily: "Roboto",
          height: "470px",
          overflow: "auto",
        }}
      >
        <Table2<Solution>
          rowCount={totalRecords}
          columns={columns}
          data={solutions}
          onAction={handleGetSolutions}
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
              if(![1, 2].includes(row.original.status)) {
                setSelectedSolutionId(row.original.id);
                setIsOpen(true);
              }             
            },
          })}
          renderFallbackValue={<EmptyTable />}
          renderToolbarInternalActions={() => {
            return <></>;
          }}
          muiTopToolbarProps={{
            sx: {
              backgroundColor: "transparent",
              mx: "-8px",
              my: "-10px",
              fontFamily: "Roboto",
            },
          }}
        />
      </Box>
      <SubmissionResultDialog
        isOpen={isOpen}
        handleCloseDeleteDialog={handleCloseResult}
        solutionId={selectedSolutionId}
      />
    </CardContent>
  );
};

interface Props {
  userId: string;
  problemId: string;
}

export default SubmissionTab;
