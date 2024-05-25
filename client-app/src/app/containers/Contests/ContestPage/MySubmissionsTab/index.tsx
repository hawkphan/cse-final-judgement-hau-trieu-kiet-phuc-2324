import { Box, CardContent } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { allColumns } from "./allColumns";
import { Table2, EmptyTable } from "../../../../shared";
import {
  Contest,
  GetPropertiesParams,
  Solution,
  useGetSolutions,
} from "../../../../queries";
import { useStore } from "../../../../shared/common/stores/store";
import SubmissionResultDialog from "../../../Problems/ProblemDetails/SubmissionTab/SubmissionResultDialog";
import { allColumnsAdmin } from "./allColumnsAdmin";

interface Props {
  contest: Contest;
  isAdmin: boolean;
}

const MySubmissionTab = ({ contest, isAdmin }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>();

  const DELAY_MS = 5000;

  const { userStore } = useStore();

  const {
    setParams,
    solutions,
    isFetching,
    totalRecords,
    handleInvalidateSolutions,
    onGetSolutions,
  } = useGetSolutions();

  const columns = useMemo(() => {
    if (isAdmin) {
      return allColumnsAdmin(contest?.problems, contest?.members);
    }

    return allColumns(contest?.problems);
  }, [contest?.problems]);

  const handleCloseResult = () => {
    setIsOpen(false);
  };

  const handleGetRecords = useCallback(
    (params: GetPropertiesParams) => {
      if (isAdmin) {
        setParams({ ...params, contestId: contest?.id });
      } else {
        setParams({
          ...params,
          userId: userStore?.user?.id,
          contestId: contest?.id,
        });
      }
    },
    [contest?.id, isAdmin, setParams, userStore?.user?.id]
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleInvalidateSolutions();
      onGetSolutions();
    }, DELAY_MS);

    return () => {
      clearTimeout(timerId);
    };
  }, [solutions, handleInvalidateSolutions, isFetching, onGetSolutions]);

  useEffect(() => {
    if (isAdmin) {
      setParams({ contestId: contest?.id });
    } else {
      setParams({ userId: userStore?.user?.id, contestId: contest?.id });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contest?.id]);

  return (
    <CardContent>
      <Box
        component="div"
        sx={{
          backgroundColor: "transparent",
          mx: "-8px",
          my: "4px",
          fontFamily: "Roboto",
          height: "470px",
          overflow: "auto",
        }}
      >
        <Table2<Solution>
          rowCount={totalRecords}
          columns={columns}
          data={solutions}
          enableTopToolbar={true}
          onAction={handleGetRecords}
          recordName="items"
          singularRecordName="item"
          enableDensityToggle={false}
          enableColumnOrdering={false}
          enableRowActions
          isLoading={isFetching}
          showLoadingOverlay={false}
          paginationDisplayMode="pages"
          isColumnPinning={false}
          additionalFilterParams={["keywords"]}
          nameColumnPinning="actions"
          renderFallbackValue={<EmptyTable />}
          renderToolbarInternalActions={() => {
            return <></>;
          }}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              if (![0, 1, 2].includes(row.original.status)) {
                setSelectedSolutionId(row.original.id);
                setIsOpen(true);
              }
            },
          })}
          muiTopToolbarProps={{
            sx: {
              backgroundColor: "transparent",
              mx: "-8px",
              my: "-10px",
              fontFamily: "Roboto",
            },
          }}
        />
      </Box>
      <SubmissionResultDialog
        isOpen={isOpen}
        handleCloseDeleteDialog={handleCloseResult}
        solutionId={selectedSolutionId}
      />
    </CardContent>
  );
};

export default MySubmissionTab;
