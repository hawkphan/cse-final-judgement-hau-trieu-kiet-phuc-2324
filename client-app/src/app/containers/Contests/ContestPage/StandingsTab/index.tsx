import { Box, CardContent } from "@mui/material";
import { EmptyTable, Table2 } from "../../../../shared";
import { useEffect, useMemo } from "react";
import { allColumns } from "./allColumns";
import { Contest, RankingMember, useGetRanking } from "../../../../queries";
import "./style.css";

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
        <div className="fl-row from-end">
          <div className="fl-row from-end contained">
            <div className="fl-row fl-item">
              <div className="iconSquare green"></div>
              <div>First to solve problem</div>
            </div>
            <div className="fl-row fl-item">
              <div className="iconSquare paleGreen"></div>
              <div>Solved Problem</div>
            </div>
            <div className="fl-row fl-item">
              <div className="iconSquare orange"></div>
              <div>Attempted Problem</div>
            </div>
          </div>
        </div>
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
          muiTableBodyProps={{}}
          muiTopToolbarProps={{
            sx: {
              backgroundColor: "transparent",
              mx: "-8px",
              my: "-20px",
              fontFamily: "Roboto",
            },
          }}
        />
      </Box>
    </CardContent>
  );
};

export default StandingsTab;
