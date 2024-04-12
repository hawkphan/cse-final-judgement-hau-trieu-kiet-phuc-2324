/* eslint-disable @typescript-eslint/no-unused-vars */
import { MRT_ColumnDef } from "material-react-table";
import "material-symbols";
import {  formatValueOrNull } from "../../../../shared";
import { StandingsRecord } from "../data.mock";

export const allColumns = (): MRT_ColumnDef<StandingsRecord>[] => {
  return [
    {
      accessorKey: "rank",
      header: "Rank",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
    },
    {
      accessorKey: "userName",
      header: "User",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
    },

    {
      accessorKey: "score",
      header: "Score",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
    },
  ];
};
