/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, Stack } from "@mui/material";
import {
  Accordion,
  CustomTableSearch,
  EmptyTable,
  Table2,
  Text,
} from "../../../shared";
import { Contest, GetPropertiesParams, useGetRegisteredContest, useGetUnregisteredContest } from "../../../queries";
import { useCallback, useMemo } from "react";
import { allColumns } from "./allColumns";
import RegisteredListToolbar from "./RegisteredListToolbar";

const RegisteredListView = () => {
  const { registeredContests, isFetching, setParams, totalRecords } = useGetRegisteredContest();

  const columns = useMemo(() => allColumns(), []);
  const handleGetUnregisteredContests = useCallback(
    (params: GetPropertiesParams) => {
      setParams({ ...params});
    },
    [setParams]
  );
  return (
    <Stack marginTop={2}>
      <Accordion title={<Text>Registered Contests</Text>} isExpanded>
        <Box padding={2}>
          <Card sx={{ paddingLeft: 2, paddingRight: 2, paddingTop: 0 }}>
            <Table2<Contest>
              rowCount={0}
              columns={columns}
              data={[]}
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
              renderToolbarInternalActions={({ table }) => {
                return <RegisteredListToolbar table={table} />;
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

export default RegisteredListView;
