import { Box, CardContent } from "@mui/material";
import { EmptyTable, Table2 } from "../../../../shared";
import {useMemo } from "react";
import { allColumns } from "./allColumns";
import { StandingsRecord, standings } from "../data.mock";

const StandingsTab = () => {
  const columns = useMemo(() => allColumns(), []);

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
        <Table2<StandingsRecord>
          rowCount={10}
          columns={columns}
          data={standings}
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
    </CardContent>
  );
};


export default StandingsTab;
