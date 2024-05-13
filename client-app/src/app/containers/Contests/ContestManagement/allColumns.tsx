import { MRT_ColumnDef } from "material-react-table";
import "material-symbols";
import { Contest } from "../../../queries";
import {
  DateFormatDisplayMinute,
  convertUTCtoLocal,
  formatDate,
  formatValueOrNull,
} from "../../../shared";
import RowActions from "../../../shared/components/RowActions";
import CountdownTimer from "../RegisteredListView/CountdownTimer";
import { renderContestRule, renderContestTypeTag } from "./helpers";

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
      accessorKey: "rule",
      header: "Rule",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => renderContestRule(cell.getValue<number>()),
    },
    {
      accessorKey: "type",
      header: "Type",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => renderContestTypeTag(cell.getValue<number>()),
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
      Cell: ({ cell }) =>
        formatDate(cell.getValue<string>(), DateFormatDisplayMinute),
    },
    {
      accessorKey: "endTime",
      header: "End Time",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) =>
        formatDate(cell.getValue<string>(), DateFormatDisplayMinute),
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
          hideEdit={false}
          hideDelete={false}
          DeleteFunction={() => {
            handleSetDeleteId(row.original.id);
            handleClickOpenDeleteDialog();
          }}
          EditFunction={() => handleEditContest(row.original.id)}
        />
      ),
    },
  ];
};
