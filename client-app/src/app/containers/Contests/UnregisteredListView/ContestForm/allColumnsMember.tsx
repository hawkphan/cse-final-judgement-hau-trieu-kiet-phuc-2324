import { MRT_ColumnDef } from "material-react-table";
import "material-symbols";
import { Callback, ContestProblem } from "../../../../queries";
import { formatValueOrNull, isEmpty } from "../../../../shared";
import { SelectOption } from "../../../../shared/components/common/MuiAutoComplete";
import { PATHS } from "../../../../configs/paths";
import RowActions from "../../../../shared/components/RowActions";

interface Props {
  problemOptions: SelectOption[];
  handleDeleteProblemRow: Callback;
}

export const allColumns = ({
  problemOptions,
  handleDeleteProblemRow,
}: Props): MRT_ColumnDef<ContestProblem>[] => {
  return [
    {
      accessorKey: "problemId",
      header: "Problem",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      // Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
      Cell: ({ cell }) => (
        <a
          href={`${PATHS.problems}/${cell.getValue<string>()}`}
          target="_blank"
        >
          {formatValueOrNull(
            !isEmpty(problemOptions)
              ? (problemOptions?.filter(
                  (item) => item.value === cell.getValue<string>()
                )[0].label as string)
              : ""
          )}
        </a>
      ),
    },
    {
      accessorKey: "score",
      header: "Score",
      enableColumnFilterModes: false,
      enableSorting: false,
      size: 114,
      Cell: ({ cell }) => formatValueOrNull(cell.getValue<string>()),
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

      Cell: ({ row }) => (
        <RowActions
          hideDelete={false}
          DeleteFunction={() => {
            handleDeleteProblemRow(row.original.problemId);
          }}
        />
      ),
    },
  ];
};
