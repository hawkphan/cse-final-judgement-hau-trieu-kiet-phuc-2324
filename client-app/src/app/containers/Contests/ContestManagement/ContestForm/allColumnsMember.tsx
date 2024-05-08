import { MRT_ColumnDef } from "material-react-table";
import "material-symbols";
import { Callback, ContestMember } from "../../../../queries";
import { formatValueOrNull, isEmpty } from "../../../../shared";
import { SelectOption } from "../../../../shared/components/common/MuiAutoComplete";
import RowActions from "../../../../shared/components/RowActions";
import { renderRole } from "./helpers";

interface Props {
  profileOptions: SelectOption[];
  handleDeleteUserRow: Callback;
  userId: string;
}

export const allColumnsMember = ({
  profileOptions,
  handleDeleteUserRow,
  userId,
}: Props): MRT_ColumnDef<ContestMember>[] => {
  return [
    {
      accessorKey: "userId",
      header: "User",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => (
        <a href={`/profile/${cell.getValue<string>()}`} target="_blank">
          {formatValueOrNull(
            !isEmpty(profileOptions)
              ? (profileOptions?.filter(
                  (item) =>
                    (item?.value as string).toLowerCase() ===
                    cell.getValue<string>().toLowerCase()
                )[0]?.label as string)
              : ""
          )}
        </a>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => renderRole(cell.getValue<number>()),
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
          hideDelete={userId?.toLowerCase() === row.original.userId}
          DeleteFunction={() => {
            handleDeleteUserRow(row.original.userId);
          }}
        />
      ),
    },
  ];
};
