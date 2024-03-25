/* eslint-disable @typescript-eslint/no-unused-vars */
import { MRT_ColumnDef } from "material-react-table";
import "material-symbols";
import { Contest } from "../../../queries";
import { formatDateOrNull, formatValueOrNull } from "../../../shared";
import RowActions from "../../../shared/components/RowActions";

interface Props {}

export const allColumns = (): MRT_ColumnDef<Contest>[] => {
  return [
    {
      accessorKey: "title",
      header: "Title",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
    },
    {
      accessorKey: "startTime",
      header: "Start Time",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => formatDateOrNull(cell.getValue<string>()),
    },
    {
      accessorKey: "endTime",
      header: "End Time",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
      Cell: ({ cell }) => formatDateOrNull(cell.getValue<string>()),
    },
    {
      accessorKey: "actions",
      header: "Action",
      muiTableHeadCellProps: {
        align: "center",
      },
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 0,

      Cell: ({ row }) =>
          <RowActions
            hideEdit={false}
            hideDelete={false}
            DeleteFunction={() => {
          
            }}
            EditFunction={() => {}}
          />
        
    },
  ];
};
