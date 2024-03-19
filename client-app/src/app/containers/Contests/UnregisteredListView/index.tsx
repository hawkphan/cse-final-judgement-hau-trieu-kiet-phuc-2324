/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, Stack } from "@mui/material";
import { Accordion, CustomTableSearch, EmptyTable, Table2, Text } from "../../../shared";

const UnregisteredListView = () => {
  return (
    <Stack marginTop={2}>
      <Accordion title={<Text>Unregistered Contests</Text>} isExpanded>
        <Box padding={2}>
          <Card sx={{ paddingLeft: 2, paddingRight: 2, paddingTop: 0 }}>
            <Table2
              rowCount={0}
              columns={[]}
              data={[]}
              recordName="items"
              onAction={() => {}}
              enableDensityToggle={false}
              enableColumnOrdering={false}
              enableRowActions
              isColumnPinning={true}
              nameColumnPinning="action"
              enableExpanding={true}
              initialState={{
                columnVisibility: {
                  "mrt-row-expand": false,
                },
              }}
              additionalFilterParams={["keywords"]}
              state={{
                isLoading: false,
              }}
              renderTopToolbarCustomActions={() => (
                <Stack direction="row" spacing={1} my={0.5}>
                  <Stack width="240px">
                    <CustomTableSearch
                      placeholder="Search by Name"
                      searchKey="keywords"
                    />
                  </Stack>
                </Stack>
              )}
              renderToolbarInternalActions={({ table }) => {
                return (
                  //   <NonFrequencyTableToolBar
                  //     table={table}
                  //     onRefreshTable={onRefreshTable}
                  //     handleAddNonFrequency={handleAddNonFrequency}
                  //   />
                  <></>
                );
              }}
              renderFallbackValue={<EmptyTable />}
              muiTopToolbarProps={{
                sx: {
                  backgroundColor: "transparent",
                  mx: "-8px",
                  my: "4px",
                },
              }}
            />
          </Card>
        </Box>
      </Accordion>
    </Stack>
  );
};

export default UnregisteredListView;
