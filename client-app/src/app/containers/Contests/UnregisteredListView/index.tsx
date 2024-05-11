/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, Stack } from "@mui/material";
import {
  Accordion,
  CustomTableSearch,
  EmptyTable,
  Table2,
  Text,
} from "../../../shared";
import {
  Contest,
  GetPropertiesParams,
  useGetUnregisteredContest,
} from "../../../queries";
import { useCallback, useMemo } from "react";
import { allColumns } from "./allColumns";
import UnregisteredListToolbar from "./UnregisteredListToolbar";

const UnregisteredListView = () => {
  // const { unregisteredContests, isFetching, setParams, totalRecords } = useGetUnregisteredContest();

  // const unregisteredContests: Contest[] = [
  //   {
  //     id: "2",
  //     code: "TLietCON",
  //     title: "TLiet Con",
  //     description: "Description",
  //     startTime: "2024-04-11T10:30:00.000Z",
  //     endTime: "2024-04-11T13:30:00.000Z",
  //     hasStarted: false,
  //     numOfMembers: 2,
  //     members: [],
  //     problems: [],
  //   },
  //   {
  //     id: "3",
  //     code: "TLietCON",
  //     title: "TLiet Con",
  //     description: "Description",
  //     startTime: "2024-04-11T10:30:00.000Z",
  //     endTime: "2024-04-11T13:30:00.000Z",
  //     hasStarted: false,
  //     numOfMembers: 2,
  //     members: [],
  //     problems: [],
  //   },
  //   {
  //     id: "4",
  //     code: "TLietCON",
  //     title: "TLiet Con",
  //     description: "Description",
  //     startTime: "2024-04-10T10:30:00.000Z",
  //     endTime: "2024-04-11T13:30:00.000Z",
  //     hasStarted: false,
  //     numOfMembers: 2,
  //     members: [],
  //     problems: [],
  //   },
  // ];

  const columns = useMemo(() => allColumns(), []);

  return (
    <Stack marginTop={2}>
      <Accordion title={<Text>Other Contests</Text>} isExpanded>
        <Box padding={2}>
          <Card sx={{ paddingLeft: 2, paddingRight: 2, paddingTop: 0 }}>
            <Table2<Contest>
              rowCount={0}
              columns={columns}
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
