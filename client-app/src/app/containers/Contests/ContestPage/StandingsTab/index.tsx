import { Box, CardContent } from "@mui/material";
import { EmptyTable, Table2 } from "../../../../shared";
import { useEffect, useMemo } from "react";
import { allColumns } from "./allColumns";
import { Contest, RankingMember, useGetRanking } from "../../../../queries";

interface Props {
  contest: Contest;
}

const StandingsTab = ({ contest }: Props) => {
  const columns = useMemo(() => allColumns(contest), [contest]);

  const { rankings, isFetching, totalRecords, setParams } = useGetRanking();

  useEffect(() => {
    setParams({ contestId: contest?.id });
  }, []);

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
        <Table2<RankingMember>
          rowCount={totalRecords}
          columns={columns}
          data={rankings}
          enableTopToolbar={true}
          recordName="items"
          singularRecordName="item"
          enableDensityToggle={false}
          enableColumnOrdering={false}
          isLoading={isFetching}
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
