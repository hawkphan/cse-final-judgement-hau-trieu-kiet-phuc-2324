import { Box, CardContent } from "@mui/material";
import { EmptyTable, Table2 } from "../../../../shared";
import { GetPropertiesParams, Result, Solution, useGetSolutions } from "../../../../queries";
import { useCallback, useEffect, useMemo, useState } from "react";
import { allColumns } from "./allColumns";
import SubmissionResultDialog from "./SubmissionResultDialog";

const SubmissionTab = ({ userId, problemId }: Props) => {
  const columns = useMemo(() => allColumns(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [resultData, setResultData] = useState<Result[]>();

  const { solutions, totalRecords, isFetching, setParams } = useGetSolutions();

  const handleCloseResult = () => {
    setIsOpen(false);
  };

  const handleGetSolutions = useCallback(
    (params: GetPropertiesParams) => {
      setParams({ ...params, userId: userId, problemId: problemId });
    },
    [problemId, setParams, userId]
  );

  useEffect(() => {
    setParams({ userId: userId, problemId: problemId });
  }, [problemId, setParams, userId]);

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
              setIsOpen(true);
              setResultData(row.original.results);
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
        data={resultData}
      />
    </CardContent>
  );
};

interface Props {
  userId: string;
  problemId: string;
}

export default SubmissionTab;
