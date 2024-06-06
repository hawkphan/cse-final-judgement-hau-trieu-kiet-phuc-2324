import { Box, CardContent } from "@mui/material";
import { EmptyTable, Table2 } from "../../../../shared";
import { useEffect, useMemo } from "react";
import { allColumns } from "./allColumns";
import { Contest, RankingMember, useGetRanking } from "../../../../queries";
import "./style.css";
import { allColumnsOlympic } from "./allColumnsOlympic";

interface Props {
  contest: Contest;
}

const StandingsTab = ({ contest }: Props) => {
  const columns = useMemo(() => {
    if (contest?.rule === 1) {
      return allColumnsOlympic(contest);
    }

    return allColumns(contest);
  }, [contest]);
  const { rankings, isFetching, totalRecords, setParams } = useGetRanking();

  useEffect(() => {
    setParams({ contestId: contest?.id });
  }, [contest?.id, setParams]);

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
          enableColumnVirtualization={false}
          recordName="items"
          singularRecordName="item"
          enableDensityToggle={false}
          enablePagination={false}
          enableColumnOrdering={false}
          enableRowSelection={false}
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
          muiTableBodyProps={{ className: "no-hover-effect" }}
          muiTopToolbarProps={{
            sx: {
              backgroundColor: "transparent",
              mx: "-8px",
              my: "-20px",
              fontFamily: "Roboto",
            },
          }}
          muiTableBodyCellProps={({ row }) => ({
            sx: {
              fontSize:
                row.original.rank === 1
                  ? "19px"
                  : row.original.rank === 2
                  ? "17px"
                  : row.original.rank === 3
                  ? "15px"
                  : "normal",
              fontWeight: row.original.rank < 4 ? "bold" : "normal",
              pointerEvents: "none",
            },
          })}
        />
      </Box>
    </CardContent>
  );
};

export default StandingsTab;
