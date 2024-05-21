/* eslint-disable @typescript-eslint/no-unused-vars */
import { MRT_ColumnDef } from "material-react-table";
import "material-symbols";
import { Solution } from "../../../../queries";
import { formatValueOrNull } from "../../../../shared";
import { getLanguageNameById, renderStatusTag } from "./helpers";
import dayjs from "dayjs";

export const allColumns = (): MRT_ColumnDef<Solution>[] => {
  return [
    {
      accessorKey: "createdDate",
      header: "Time Submitted",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) =>
        dayjs(cell.getValue<string>()).format("YYYY/MM/DD HH:mm:ss"),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) => renderStatusTag(cell.getValue<number>()),
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
      Cell: ({ cell }) => cell.getValue<string>() + " KB",
    },
    {
      accessorKey: "languageId",
      header: "Language",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 10,
      Cell: ({ cell }) => formatValueOrNull(getLanguageNameById(cell.getValue<number>())),
    },
  ];
};
