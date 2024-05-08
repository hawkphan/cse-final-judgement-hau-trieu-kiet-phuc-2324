/* eslint-disable @typescript-eslint/no-unused-vars */
import { MRT_ColumnDef } from "material-react-table";
import "material-symbols";
import { Contest } from "../../../queries";
import {
  convertUTCtoLocal,
  formatUTCToLocale,
  formatValueOrNull,
  isTimeInPast,
} from "../../../shared";
import RowActions from "../../../shared/components/RowActions";
import CountdownTimer from "./CountdownTimer";

export const allColumns = (
  isTimerExpired: boolean,
  setIsTimerExpired: (boolean) => void
): MRT_ColumnDef<Contest>[] => {
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
      accessorKey: "startTime",
      header: "Start Time",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) =>
        formatUTCToLocale(cell.getValue<string>(), "Asia/Ho_Chi_Minh"),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => (
        <CountdownTimer
          startTime={convertUTCtoLocal(
            cell.row.original.startTime,
            "Asia/Ho_Chi_Minh",
            7
          )}
          endTime={convertUTCtoLocal(
            cell.row.original.endTime,
            "Asia/Ho_Chi_Minh",
            7
          )}
        />
      ),
    },
    {
      accessorKey: "numOfMembers",
      header: "Participants",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
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
          hideEnter={false}
          hideDetail={false}
          disableEnter={!row.original.hasStarted} // Use state value
          DetailFunction={() => {}}
          EnterFunction={() => {}}
        />
      ),
    },
  ];
};
