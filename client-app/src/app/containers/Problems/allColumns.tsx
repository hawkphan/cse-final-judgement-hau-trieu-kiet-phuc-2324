import { MRT_ColumnDef } from "material-react-table";
import { formatDateOrNull, formatValueOrNull } from "../../shared";
import { Problem } from "../../queries";
import "material-symbols";
import RowActions from "../../shared/components/RowActions";
import { renderDifficultyTag } from "./helpers";
import { Typography } from "@mui/material";

interface Props {
  handleEditProblem: (id: string) => void;
  handleClickOpenDeleteDialog: () => void;
  handleSetDeleteId: (id: string) => void;
  userId: string;
}

export const allColumns = ({
  handleEditProblem,
  handleClickOpenDeleteDialog,
  handleSetDeleteId,
  userId,
}: Props): MRT_ColumnDef<Problem>[] => {
  return [
    {
      accessorKey: "code",
      header: "Code",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => (
        <Typography fontWeight={600}>{formatValueOrNull(cell.getValue<string>())}</Typography>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => <Typography fontWeight={600}>{formatValueOrNull(cell.getValue<string>())}</Typography>,
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      enableColumnFilterModes: false,
      enableSorting: true,
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
      enableSorting: true,
      size: 114,
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
      size: 96,

      Cell: ({ row }) =>
        userId === row.original.userId && (
          <RowActions
            hideEdit={false}
            hideDelete={false}
            DeleteFunction={() => {
              handleSetDeleteId(row.original.id);
              handleClickOpenDeleteDialog();
            }}
            EditFunction={() => handleEditProblem(row.original.id)}
          />
        ),
    },
  ];
};
