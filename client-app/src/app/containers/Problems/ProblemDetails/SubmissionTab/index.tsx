import { Box, CardContent, Stack } from "@mui/material";
import { CustomTableSearch, EmptyTable, Table2 } from "../../../../shared";
import { Solution } from "../../../../queries";
import { useMemo } from "react";
import { allColumns } from "./allColumns";

const SubmissionTab = () => {
  const columns = useMemo(() => allColumns(), []);

  return (
    <CardContent>
      <Box
        component="div" // Add this line
        sx={{
          backgroundColor: "transparent",
          mx: "-8px",
          my: "4px",
          fontFamily: "Roboto",
        }}
      >
        <Table2<Solution>
          rowCount={0}
          columns={columns}
          data={[]}
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
          renderTopToolbarCustomActions={() => (
            <Stack direction="row" spacing={1} my={0.5}>
              <Stack width="328px">
                <CustomTableSearch
                  placeholder="Search by Name"
                  searchKey="keywords"
                />
              </Stack>
            </Stack>
          )}
          renderToolbarInternalActions={() => {
            return <></>;
          }}
          muiTopToolbarProps={{
            sx: {
              backgroundColor: "transparent",
              mx: "-8px",
              my: "4px",
              fontFamily: "Roboto",
            },
          }}
        />
      </Box>
    </CardContent>
  );
};

export default SubmissionTab;
