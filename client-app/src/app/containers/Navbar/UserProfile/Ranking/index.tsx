import { Container, Grid } from "@mui/material";
import {
  Breadcrumbs,
  EmptyTable,
  LoadingCommon,
  Table2,
} from "../../../../shared";
import { allColumns, toBreadCrumbs } from "./helpers";
import { useStore } from "../../../../shared/common/stores/store";
import { useEffect, useMemo } from "react";
import { Ranking } from "../../../../queries";
import { useGetRankings } from "../../../../queries/Profiles/useGetRankings";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../../configs/paths";

export default function RankingPage() {
  const navigate = useNavigate();

  const {
    rankings,
    totalRecords,
    isFetching,
    setParams,
    handleInvalidateRankings,
  } = useGetRankings();

  const { userStore } = useStore();

  const handleNavigateToDetail = (id: string) => {
    navigate(PATHS.profile.replace(":id", id));
  };

  const handleGetRanking = () => {
    setParams({ pageSize: -1 });
  };

  const isUserInRankings = rankings.some(
    (ranking) => ranking.id === userStore?.user?.id
  );

  useEffect(() => {
    handleInvalidateRankings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(() => allColumns(), []);

  if (isFetching) {
    return <LoadingCommon />;
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={12}>
        <Container maxWidth="xl">
          <Breadcrumbs items={toBreadCrumbs(userStore?.user?.id)} />
          <Table2<Ranking>
            rowCount={totalRecords}
            columns={columns}
            data={rankings}
            enableRowNumbers={false}
            enableTopToolbar={false}
            enablePagination={false}
            keepPinnedRows={true}
            getRowId={(row) => row.id}
            isLoading={isFetching}
            rowPinningDisplayMode="top-and-bottom"
            initialState={{
              columnVisibility: {
                id: false,
              },
              rowPinning: {
                top: isUserInRankings ? [userStore?.user?.id] : [],
                bottom: [],
              },
            }}
            recordName="items"
            onAction={handleGetRanking}
            singularRecordName="item"
            enableDensityToggle={false}
            enableColumnOrdering={false}
            enableRowPinning={true}
            enableStickyHeader={true}
            enableRowActions
            paginationDisplayMode="pages"
            isColumnPinning={false}
            nameColumnPinning="actions"
            enableSorting={false}
            muiTableContainerProps={{
              sx: {
                maxHeight: "800px",
              },
            }}
            state={{
              isLoading: isFetching,
            }}
            muiTableBodyRowProps={({ row }) => ({
              onClick: () => {
                handleNavigateToDetail(row.original.id);
              },
            })}
            renderFallbackValue={<EmptyTable />}
            muiTopToolbarProps={{
              sx: {
                mx: "-8px",
                my: "4px",
                fontFamily: "Roboto",
              },
            }}
            muiTableBodyCellProps= {(({row}) => ({
              sx:{
                fontSize:
                row.original.rank === 1
                  ? "19px"
                  : row.original.rank === 2
                  ? "17px"
                  : row.original.rank === 3
                  ? "15px"
                  : "normal",
              fontWeight: row.original.rank < 4 ? "bold" : "normal",
              }
            }))
            }
          />
        </Container>
      </Grid>
    </Grid>
  );
}
