/* eslint-disable @typescript-eslint/no-unused-vars */
import { MRT_ColumnDef } from "material-react-table";
import "material-symbols";
import { formatValueOrNull } from "../../../../shared";
import { Contest, RankingMember } from "../../../../queries";
import { Box } from "@mui/material";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";


export const allColumnsOlympic = (
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
              ? "#388e3c"
              : row.original.problems.find(
                  (p) => p.problemId === problem.problemId
                )?.status == 1
              ? "#00c853"
              : "orange",
          color: "white",
        },
      }),
      Cell: ({ cell }) => {
        const data = cell.row.original.problems[problem.order - 1];
        return formatValueOrNull(data.score + "");
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
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div style={{ width: "15px" }}>
            <MilitaryTechIcon
              style={{
                display: row.original.rank < 4 ? "block" : "none",
                right: "0px",
                color:
                  row.original.rank === 1
                    ? "#D6AF36"
                    : row.original.rank === 2
                    ? "#D7D7D7"
                    : "#A77044",
              }}
            />
          </div>
          <div>
            <span>{renderedCellValue}</span>
          </div>
        </Box>
      ),
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
    {
      accessorKey: "score",
      header: "Score",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 20,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
    },
    ...problemColumns,
  ];
};
