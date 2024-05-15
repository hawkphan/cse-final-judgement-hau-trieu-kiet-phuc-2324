import { MRT_ColumnDef } from "material-react-table";
import { PATHS } from "../../../../configs/paths";
import { Ranking } from "../../../../queries";
import { formatValueOrNull } from "../../../../shared";

export const toBreadCrumbs = (id: string) => {
  return [
    {
      id: 0,
      label: "Profile",
      href: `${PATHS.profile.replace(":id", id)}`,
    },
    {
      id: 1,
      label: "Ranking",
    },
  ];
};

export const allColumns = (): MRT_ColumnDef<Ranking>[] => {
  return [
    {
      accessorKey: "rank",
      header: "Rank",
      enableColumnFilterModes: false,
      enableSorting: true,
      size: 114,
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
      Cell: ({ cell }) => (cell.getValue<number>()),
    },
    {
      accessorKey: "displayName",
      header: "User",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
    },
    {
      accessorKey: "elo",
      header: "Elo Score",
      enableColumnFilterModes: false,
      enableSorting: true,
      size: 114,
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
      Cell: ({ cell }) => (cell.getValue<number>()),
    }
  ];
};
