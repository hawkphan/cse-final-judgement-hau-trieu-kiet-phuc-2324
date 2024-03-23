/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, Stack } from "@mui/material";
import {
  Accordion,
  CustomTableSearch,
  EmptyTable,
  Table2,
  Text,
} from "../../../shared";
import { Contest, GetPropertiesParams, useGetUnregisteredContest } from "../../../queries";
import { useCallback, useMemo } from "react";
import { allColumns } from "./allColumns";
import UnregisteredListToolbar from "./UnregisteredListToolbar";

const UnregisteredListView = () => {
  const { unregisteredContests, isFetching, setParams, totalRecords } = useGetUnregisteredContest();

  const columns = useMemo(() => allColumns(), []);
  const handleGetUnregisteredContests = useCallback(
    (params: GetPropertiesParams) => {
      setParams({ ...params});
    },
    [setParams]
  );
  return (
    <Stack marginTop={2}>
      <Accordion title={<Text>Unregistered Contests</Text>} isExpanded>
        <Box padding={2}>
          <Card sx={{ paddingLeft: 2, paddingRight: 2, paddingTop: 0 }}>
            <Table2<Contest>
              rowCount={totalRecords}
              columns={columns}
              data={unregisteredContests}
              recordName="items"
              onAction={handleGetUnregisteredContests}
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
                isLoading: isFetching,
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
                return <UnregisteredListToolbar table={table} />;
              }}
              renderFallbackValue={<EmptyTable />}
              muiTopToolbarProps={{
                sx: {
                  backgroundColor: "transparent",
                  mx: "-8px",
                  my: "4px",
                  fontFamily: "Roboto",
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
