import { MRT_ColumnDef } from "material-react-table";
import { PATHS } from "../../../../configs/paths";
import { Ranking } from "../../../../queries";
import { formatValueOrNull } from "../../../../shared";
import { Box } from "@mui/material";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

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
      size: 25,
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
      accessorKey: "displayName",
      header: "User",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,

      Cell: ({ cell, row }) => (
        <span
          style={{
            fontSize:
              row.original.rank === 1
                ? "19px"
                : row.original.rank === 2
                ? "17px"
                : row.original.rank === 3
                ? "15px"
                : "normal",
            fontWeight: row.original.rank < 4 ? "bold" : "normal",
          }}
        >
          {formatValueOrNull(cell.getValue<string>())}
        </span>
      ),
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
      Cell: ({ cell, row }) => (
        <span
          style={{
            fontSize:
              row.original.rank === 1
                ? "19px"
                : row.original.rank === 2
                ? "17px"
                : row.original.rank === 3
                ? "15px"
                : "normal",
            fontWeight: row.original.rank < 4 ? "bold" : "normal",
          }}
        >
          {Math.floor(cell.getValue<number>())}
        </span>
      ),
    },
  ];
};
