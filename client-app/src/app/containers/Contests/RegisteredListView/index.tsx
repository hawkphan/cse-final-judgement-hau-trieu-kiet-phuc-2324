/* eslint-disable react-hooks/exhaustive-deps */
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
  useGetRegisteredContest,
  useGetUnregisteredContest,
} from "../../../queries";
import { useMemo, useState } from "react";
import { allColumns } from "./allColumns";
import RegisteredListToolbar from "./RegisteredListToolbar";

const RegisteredListView = () => {
  // const { registeredContests, isFetching, setParams, totalRecords } = useGetRegisteredContest();
  const [isTimerExpired, setIsTimerExpired] = useState(false);

  const registeredContests: Contest[] = [
    {
      id: "1",
      code: "T1CON",
      title: "T1 Con",
      description: "Description",
      startTime: "2024-04-10T10:10:30.000Z",
      endTime: "2024-04-11T13:30:00.000Z",   
      hasStarted: false,
      numOfMembers: 2,
      members: [],
      problems: [],
    },
    {
      id: "1",
      code: "T1CON",
      title: "T1 Con",
      description: "Description",
      startTime: "2024-04-10T09:10:30.000Z",
      endTime: "2024-04-10T13:30:00.000Z",
      hasStarted: true,
      numOfMembers: 2,
      members: [],
      problems: [],
    },
  ];

  const columns = useMemo(
    () => allColumns(isTimerExpired, setIsTimerExpired),
    [isTimerExpired, setIsTimerExpired]
  );

  return (
    <Stack marginTop={2}>
      <Accordion title={<Text>Your Schedule</Text>} isExpanded>
        <Box padding={2}>
          <Card sx={{ paddingLeft: 2, paddingRight: 2, paddingTop: 0 }}>
            <Table2<Contest>
              rowCount={0}
              columns={columns}
              data={registeredContests}
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
              renderToolbarInternalActions={({ table }) => {
                return <RegisteredListToolbar table={table} />;
              }}
              renderFallbackValue={<EmptyTable />}
              muiTopToolbarProps={{
                sx: {
                  backgroundColor: "transparent",
                },
              }}
            />
          </Card>
        </Box>
      </Accordion>
    </Stack>
  );
};

export default RegisteredListView;
