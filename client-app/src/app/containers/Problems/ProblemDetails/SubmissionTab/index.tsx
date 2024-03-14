import { Box, CardContent } from "@mui/material";
import { EmptyTable, Table2 } from "../../../../shared";
import { Result, Solution, allSolutions } from "../../../../queries";
import { useCallback, useMemo, useState } from "react";
import { allColumns } from "./allColumns";
import SubmissionResultDialog from "./SubmissionResultDialog";

const SubmissionTab = () => {
  const columns = useMemo(() => allColumns(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [resultData, setResultData] = useState<Result[]>();

  // const {solutions, totalRecords, isFetching} = useGetSolutions();

  const handleCloseResult = () => {
    setIsOpen(false);
  };

  return (
    <CardContent>
      <Box
        component="div"
        sx={{
          backgroundColor: "transparent",
          mx: "-8px",
          my: "4px",
          fontFamily: "Roboto",
        }}
      >
        <Table2<Solution>
          rowCount={allSolutions.data.length}
          columns={columns}
          data={allSolutions.data}
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
              my: "-30px",
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

export default SubmissionTab;
