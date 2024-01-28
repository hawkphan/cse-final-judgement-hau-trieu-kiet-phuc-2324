import { Container, Stack } from "@mui/material";
import { Button, CustomTableSearch, EmptyTable, Table2 } from "../../shared";
import { allColumns } from "./allColumns";
import { GetPropertiesParams, Problem } from "../../queries/Problems/types";
import { useNavigate } from "react-router-dom";
import { useGetProblems } from "../../queries/Problems/useGetProblems";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
const Problems = () => {
  const { problems, totalRecords, setParams, isFetching } = useGetProblems();

  const navigate = useNavigate();

  const handleGetProblems = (params: GetPropertiesParams) => {
    setParams(params);
  };

  const handleNavigateToDetail = (id: string) => {
    navigate(id);
  };

  const columns = allColumns();
  return (
    <Container maxWidth="xl">
      <Table2<Problem>
        rowCount={totalRecords}
        columns={columns}
        data={problems}
        onAction={handleGetProblems}
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
        state={{
          isLoading: isFetching,
        }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            handleNavigateToDetail(row.original.id);
          },
        })}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={1} my={0.5}>
            <Stack width="328px">
              <CustomTableSearch
                placeholder="Search by Title"
                searchKey="keywords"
              />
            </Stack>
          </Stack>
        )}
        renderToolbarInternalActions={() => {
          return (
            <Stack>
              <Button
                className="btn btn-primary"
                icon={<PostAddRoundedIcon fontSize="medium" />}
                style={{ fontFamily: "Roboto", marginTop: "6px" }}
              >
                New
              </Button>
            </Stack>
          );
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
    </Container>
  );
};

export default Problems;
