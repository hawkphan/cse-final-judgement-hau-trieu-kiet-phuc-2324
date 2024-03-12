import { Box, CardContent } from "@mui/material";
import { EmptyTable, Table2 } from "../../../../shared";
import { Solution, allSolutions } from "../../../../queries";
import { useMemo } from "react";
import { allColumns } from "./allColumns";

const SubmissionTab = () => {
  const columns = useMemo(() => allColumns(), []);

  // const {solutions, totalRecords, isFetching} = useGetSolutions();

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
    </CardContent>
  );
};

export default SubmissionTab;
