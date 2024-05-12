/* eslint-disable @typescript-eslint/no-unused-vars */
import { MRT_ColumnDef } from "material-react-table";
import "material-symbols";
import { Result } from "../../../../../queries";
import { formatValueOrNull } from "../../../../../shared";
import { renderStatusTag } from "../helpers";
import { Tooltip } from "@mui/material";

export const allColumns = (): MRT_ColumnDef<Result>[] => {
  return [
    {
      accessorKey: "testCase.name",
      header: "Test Case",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) =>
        cell.row.original.error !== "None" ? (
          <Tooltip title={cell.row.original.error}>
            {renderStatusTag(cell.getValue<number>())}
          </Tooltip>
        ) : (
          renderStatusTag(cell.getValue<number>())
        ),
    },
    {
      accessorKey: "executionTime",
      header: "Run Time",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) => cell.getValue<string>() + " ms",
    },
    {
      accessorKey: "memoryUsage",
      header: "Memory",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) => cell.getValue<string>() + " MB",
    },
  ];
};
