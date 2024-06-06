/* eslint-disable @typescript-eslint/no-unused-vars */
import { MRT_ColumnDef } from "material-react-table";
import "material-symbols";
import { Callback, Contest } from "../../../queries";
import { formatUTCToLocale, formatValueOrNull } from "../../../shared";
import RowActions from "../../../shared/components/RowActions";
import { Typography } from "@mui/material";

interface Props {
  onDetail: Callback;
}

export const allColumns = ({ onDetail }: Props): MRT_ColumnDef<Contest>[] => {
  return [
    {
      accessorKey: "name",
      header: "Name",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => (
        <Typography fontWeight={600}>
          {formatValueOrNull(cell.getValue<string>())}
        </Typography>
      ),
    },
    {
      accessorKey: "startTime",
      header: "Start Time",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) =>
        formatUTCToLocale(cell.getValue<string>(), "Asia/Ho_Chi_Minh"),
    },
    {
      accessorKey: "endTime",
      header: "End Time",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) =>
        formatUTCToLocale(cell.getValue<string>(), "Asia/Ho_Chi_Minh"),
    },
    {
      accessorKey: "numOfMembers",
      header: "Participants",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) =>
        formatValueOrNull(cell?.row?.original?.members?.length + ""),
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

      Cell: ({ row }) => (
        <RowActions
          hideDetail={false}
          DetailFunction={() => onDetail(row.original)}
        />
      ),
    },
  ];
};
