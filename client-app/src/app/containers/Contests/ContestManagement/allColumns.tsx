import { MRT_ColumnDef } from "material-react-table";
import "material-symbols";
import { Contest } from "../../../queries";
import {
  convertUTCtoLocal,
  formatDateOrNull,
  formatValueOrNull,
} from "../../../shared";
import RowActions from "../../../shared/components/RowActions";
import CountdownTimer from "../RegisteredListView/CountdownTimer";

interface Props {
  handleEditContest: (id: string) => void;
  handleClickOpenDeleteDialog: () => void;
  handleSetDeleteId: (id: string) => void;
}

export const allColumns = ({
  handleEditContest,
  handleClickOpenDeleteDialog,
  handleSetDeleteId,
}: Props): MRT_ColumnDef<Contest>[] => {
  return [
    {
      accessorKey: "name",
      header: "Name",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
    },
    {
      accessorKey: "numOfMembers",
      header: "Participants",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) =>
        formatValueOrNull(cell.row.original.members.length + ""),
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
      Cell: ({ cell }) => formatDateOrNull(cell.getValue<string>()),
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
      accessorKey: "actions",
      header: "Action",
      muiTableHeadCellProps: {
        align: "center",
      },
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 96,

      Cell: ({ row }) => (
        <RowActions
          hideEdit={row.original.hasStarted}
          hideDelete={row.original.hasStarted}
          hideDetail={false}
          DeleteFunction={() => {
            handleSetDeleteId(row.original.id);
            handleClickOpenDeleteDialog();
          }}
          EditFunction={() => handleEditContest(row.original.id)}
          DetailFunction={() => {}}
        />
      ),
    },
  ];
};
