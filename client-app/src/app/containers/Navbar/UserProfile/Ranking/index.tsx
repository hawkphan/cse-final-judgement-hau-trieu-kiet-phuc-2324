import { Container, Grid } from "@mui/material";
import { Breadcrumbs, EmptyTable, Table2 } from "../../../../shared";
import { allColumns, toBreadCrumbs } from "./helpers";
import { useStore } from "../../../../shared/common/stores/store";
import { useMemo } from "react";
import { Ranking } from "../../../../queries";
import { useGetRankings } from "../../../../queries/Profiles/useGetRankings";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../../configs/paths";

export default function RankingPage() {
  const { userStore } = useStore();
  const navigate = useNavigate();
  const id = useMemo(() => {
    return userStore?.user?.id;
  }, [userStore.user]);

  const { rankings, totalCount, isFetching } = useGetRankings();

  const handleNavigateToDetail = (id: string) => {
    navigate(PATHS.profile.replace(":id", id));
  };

  const columns = useMemo(() => allColumns(), [id]);

  return (
    <Grid container justifyContent={"center"} sx={{ marginTop: "60px" }}>
      <Grid item xs={12}>
        <Container maxWidth="xl">
          <Breadcrumbs items={toBreadCrumbs(id)} />
          <Table2<Ranking>
            rowCount={totalCount}
            columns={columns}
            data={rankings}
            enableRowNumbers={false}
            enableTopToolbar={false}
            recordName="items"
            singularRecordName="item"
            enableDensityToggle={false}
            enableColumnOrdering={false}
            enableRowActions
            paginationDisplayMode="pages"
            isColumnPinning={false}
            nameColumnPinning="actions"
            enableSorting={false}
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
          />
        </Container>
      </Grid>
    </Grid>
  );
}
