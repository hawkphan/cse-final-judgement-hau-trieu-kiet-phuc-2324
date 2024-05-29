/* eslint-disable @typescript-eslint/no-unused-vars */
import { MRT_ColumnDef } from "material-react-table";
import "material-symbols";
import { formatValueOrNull } from "../../../../shared";
import { Contest, RankingMember } from "../../../../queries";

export const allColumns = (
  contest: Contest
): MRT_ColumnDef<RankingMember>[] => {
  const problemColumns: MRT_ColumnDef<RankingMember>[] = contest?.problems.map(
    (problem) => ({
      accessorKey: problem.problemId,
      header: `${problem?.problem?.code} - ${problem?.problem?.title}`,
      enableColumnFilterModes: false,
      enableSorting: false,
      muiTableBodyCellProps: ({ row }) => ({
        sx: {
          background:
            row.original.problems.find((p) => p.problemId === problem.problemId)
              ?.status == 0
              ? '#388e3c'
              : row.original.problems.find(
                  (p) => p.problemId === problem.problemId
                )?.status == 1
              ? '#00c853'
              : "orange",
          color: "white",
        },
      }),
      Cell: ({ cell }) => {
        const data = cell.row.original.problems[problem.order - 1];

        if (data.timeSpent === 0) {
          return "--";
        }

        return formatValueOrNull(
          data.submissionCount + "/" + parseInt(data.timeSpent / 60 + "")
        );
      },
    })
  );

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
      accessorKey: "solvedProblemCount",
      header: "Solved",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
    },
    {
      accessorKey: "totalTime",
      header: "Time in Minutes",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) =>
        formatValueOrNull(parseInt(cell.getValue<number>() / 60 + "") + ""),
    },
    ...problemColumns,
  ];
};
