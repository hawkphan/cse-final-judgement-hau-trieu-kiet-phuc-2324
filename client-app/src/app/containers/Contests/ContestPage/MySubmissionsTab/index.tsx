import { Box, CardContent } from "@mui/material";
import { useMemo } from "react";
import { allColumns } from "./allColumns";
import { Table2, EmptyTable } from "../../../../shared";
import { MySubmissionsRecord, submissions } from "../data.mock";

const MySubmissionTab = () => {
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
        <Table2<MySubmissionsRecord>
          rowCount={10}
          columns={columns}
          data={submissions}
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

export default MySubmissionTab;
