import { MRT_ColumnDef } from "material-react-table";
import "material-symbols";
import { renderDifficultyTag } from "../../../Problems/helpers";
import { Problem } from "../../../../queries";
import { formatDateOrNull, formatValueOrNull } from "../../../../shared";

export const allColumns = (): MRT_ColumnDef<Problem>[] => {
  return [
    {
      accessorKey: "code",
      header: "Code",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
    },
    {
      accessorKey: "title",
      header: "Title",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
      Cell: ({ cell }) => renderDifficultyTag(cell.getValue<number>()),
    },
    {
      accessorKey: "date",
      header: "Date Published",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => formatDateOrNull(cell.getValue<string>()),
    },
  ];
};
