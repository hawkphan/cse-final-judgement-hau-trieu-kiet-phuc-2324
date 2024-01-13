import { Container, Stack, Typography } from "@mui/material";
import Table from "../../common/Table";

const Developer = () => {
  const columns = [
    { name: "ID", options: { filter: true } },
    { name: "Name", options: { filter: true } },
    { name: "Address", options: { filter: true } },
    { name: "E-mail", options: { filter: true } },
    {
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              onClick={() => {
                console.log("row", tableMeta.rowData);
                console.log("value", value);
                console.log("updateValue", updateValue);
              }}
              className="button muted-button"
            >
              Edit
            </button>
          );
        },
      },
    },
  ];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ];

  return (
    <Container>
      <Stack>
        <Typography variant="h3">Table</Typography>
        <Table columns={columns} data={data} title="Title nè" />
      </Stack>
    </Container>
  );
};

export default Developer;
