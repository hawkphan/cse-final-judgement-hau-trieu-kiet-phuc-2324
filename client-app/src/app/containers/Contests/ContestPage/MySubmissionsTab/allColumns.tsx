/* eslint-disable @typescript-eslint/no-unused-vars */
import { MRT_ColumnDef } from "material-react-table";
import "material-symbols";
import { renderStatusTag } from "./helpers";
import dayjs from "dayjs";
import { formatValueOrNull } from "../../../../shared";
import { MySubmissionsRecord } from "../data.mock";

export const allColumns = (): MRT_ColumnDef<MySubmissionsRecord>[] => {
  return [
    {
      accessorKey: "problemName",
      header: "Problem",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
    },
    {
      accessorKey: "timeSubmitted",
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
      accessorKey: "runtime",
      header: "Run Time",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) => cell.getValue<string>() + " ms",
    },
    {
      accessorKey: "memory",
      header: "Memory",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) => cell.getValue<string>() + " KB",
    },
    {
      accessorKey: "languageName",
      header: "Language",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
    },
    {
      accessorKey: "testcasePassed",
      header: "Testcase passed (%)",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) => cell.getValue<string>() + "%",
    },
  ];
};
