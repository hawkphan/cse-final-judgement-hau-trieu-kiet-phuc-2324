import MUIDataTable from "mui-datatables";

const Table = ({
  columns,
  data,
  title,
  selectableRowsHideCheckboxes,
}: Props) => {
  const options = {
    filterType: "checkbox",
    rowsPerPage: [6],
    rowsPerPageOptions: [1, 3, 5, 6],
    jumpToPage: true,
    textLabels: {
      pagination: {
        next: "Next >",
        previous: "< Previous",
        rowsPerPage: "Total items Per Page",
        displayRows: "of",
      },
    },
    download: false,
    caseSensitive: false,
    print: false,
    viewColumns: false,
    selectableRowsHideCheckboxes: selectableRowsHideCheckboxes ?? true,
    onChangePage(currentPage: number) {
      console.log({ currentPage });
    },
    onChangeRowsPerPage(numberOfRows: number) {
      console.log({ numberOfRows });
    },
  };

  return (
    <MUIDataTable
      title={title ?? ""}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

interface Props {
  title?: string;
  columns: unknown;
  data: string[][];
  selectableRowsHideCheckboxes?: boolean;
}

export default Table;
