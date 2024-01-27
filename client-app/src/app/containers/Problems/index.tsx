import { Container, Stack } from "@mui/material";
import { problems } from "../../queries/Problems";
import { CustomTableSearch, EmptyTable, Table2 } from "../../shared";
import { allColumns } from "./allColumns";
import { Problem } from "../../queries/Problems/types";
import { useNavigate } from "react-router-dom";


const Problems = () => {
  //TODO: Integrate API
  // const {problems} = useGetProblems();
  const navigate = useNavigate();

  const data = problems.data as Problem[];

  const totalCount = problems.data.length;
  const columns = allColumns();
  const handleGetProblems = () => {};
  return (
    <Container style={{fontSize: '24px'}}>
      <Table2<Problem>
            rowCount={totalCount}
            columns={columns}
            data={data}
            onAction={handleGetProblems}
            enableTopToolbar={true}
            recordName="items"
            singularRecordName="item"
            enableDensityToggle={false}
            enableColumnOrdering={false}
            enableRowActions
            paginationDisplayMode="pages"
            isColumnPinning={false}
            additionalFilterParams={['keywords']}
            nameColumnPinning="actions"
            state={{
              isLoading: false,
            }}
            muiTableBodyRowProps={({ row }) => ({
              onClick: () => {
                console.log(row.original);
                navigate(`${row.original.id}`);
              },
            })}
            renderTopToolbarCustomActions={() => (
              <Stack direction="row" spacing={1} my={0.5}>
                <Stack width="328px">
                  <CustomTableSearch placeholder="Search by Title" searchKey="keywords" />
                </Stack>
              </Stack>
            )}
            renderToolbarInternalActions={() => {
              return (
                <></>
              );
            }}
            renderFallbackValue={<EmptyTable />}
            muiTopToolbarProps={{
              sx: {
                backgroundColor: 'transparent',
                mx: '-8px',
                my: '4px',
              },
            }}
          />
    </Container>
  );
};

export default Problems;
