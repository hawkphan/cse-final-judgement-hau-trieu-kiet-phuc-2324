import { MRT_ColumnDef } from "material-react-table";
import {
  Tag,
  formatDateOrNull,
  formatValueOrNull,
} from "../../shared";
import { Problem } from "../../queries/Problems/types";
import "material-symbols";
import RowActions from "../../shared/components/RowActions";

const renderDifficultyTag = (value: string) => {
  switch (value.toLowerCase()) {
    case "easy":
      return (
        <Tag variant="is-customize" backgroundColor="#D1F5D3" color="#4CAF50">
          Easy
        </Tag>
      );
    case "medium":
      return (
        <Tag variant="is-customize" backgroundColor="#FFE082" color="#FF9800">
          Medium
        </Tag>
      );
    case "hard":
      return (
        <Tag variant="is-customize" backgroundColor="#FFCDD2" color="#F44336">
          Hard
        </Tag>
      );
    default:
      return "--";
  }
};

export const allColumns = (): MRT_ColumnDef<Problem>[] => {
  return [
    {
      accessorKey: "code",
      header: "Code",
      enableColumnFilterModes: false,
      enableSorting: true,
      size: 114,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
    },
    {
      accessorKey: "title",
      header: "Title",
      enableColumnFilterModes: false,
      enableSorting: true,
      size: 114,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
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
      Cell: ({ cell }) => renderDifficultyTag(cell.getValue<string>()),
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

      Cell: () => (
        <RowActions
          hideEdit={false}
          hideDetail={false}
          hideDelete={false}
          DeleteFunction={() => () => {}}
          EditFunction={() => () => {}}
          DetailFunction={() => {}}
        />
      ),
    },
  ];
};
