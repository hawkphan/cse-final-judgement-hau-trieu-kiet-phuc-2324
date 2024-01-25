import MUIDataTable from "mui-datatables";
import { Problem } from "../../models/problem";
import axios from "axios";
import { useEffect } from "react";



// useEffect(() => {
//   axios
//     .get<Problem[]>("http://localhost:5000/api/problems")
//     .then((response) => {
//       setProblems(response.data);
//     });
// }, []);


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
  data: Problem[];
  selectableRowsHideCheckboxes?: boolean;
}

export default Table;
