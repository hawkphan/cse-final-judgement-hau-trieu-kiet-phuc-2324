/* eslint-disable @typescript-eslint/no-explicit-any */

import { ThemeProvider } from "@mui/material";
import {
  MRT_PaginationState,
  MRT_SortingState,
  MRT_TableState,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_TableOptions,
} from "material-react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TableQueryParams, getAdditionalParams } from "../Table/helpers";
import Typo from "../Typo";
import "./styles.scss";
import {
  COLOR_CODE,
  getDefaultMRTOptions,
  getMRTTableTheme,
  isEmpty,
} from "../../..";

interface Props<TData extends MRT_RowData> extends MRT_TableOptions<TData> {
  columns: MRT_ColumnDef<TData>[];
  data: TData[];

  isColumnPinning?: boolean;
  nameColumnPinning?: string;

  isLocalState?: boolean;
  additionalFilterParams?: string[];
  isLoading?: boolean;
  showLoadingOverlay?: boolean;
  recordName?: string;
  singularRecordName?: string;
  onAction?: (..._args: any[]) => void;

  isLayoutGridMode?: boolean;
}

const getSortOrderStateFromParamsUrl = (sortParams: string) => {
  if (!sortParams) return [];

  if (sortParams?.includes(":")) {
    const sortOrderSplit = sortParams?.split(":");
    if (
      sortOrderSplit.length === 2 &&
      ["asc", "desc"].includes(sortOrderSplit[1])
    ) {
      return [
        {
          id: sortOrderSplit[0],
          desc: sortOrderSplit[1] === "desc",
        },
      ];
    }
  }

  return [];
};

const getSortOrderParamsUrlFromState = (sortState: MRT_SortingState) => {
  return !isEmpty(sortState)
    ? `${sortState[0].id}:${sortState[0].desc ? "desc" : "asc"}`
    : null;
};

const getInitialState = <TData,>({
  initialState,
  isLocalState,
  searchParams,
}: {
  initialState: Partial<MRT_TableState<TData>>;
  isLocalState: boolean;
  searchParams: URLSearchParams;
}): Partial<MRT_TableState<TData>> => {
  let sortOrder = initialState?.sorting || [];
  if (!isLocalState) {
    const sortParams = searchParams.get(TableQueryParams.SORT);
    sortOrder = getSortOrderStateFromParamsUrl(sortParams);
  }

  return {
    globalFilter: initialState?.globalFilter, //just use globalFilter for local state
    sorting: sortOrder,
    pagination: {
      pageIndex: isLocalState
        ? initialState?.pagination?.pageIndex || 0
        : searchParams.has(TableQueryParams.PAGE)
        ? Number(searchParams.get(TableQueryParams.PAGE))
        : initialState?.pagination?.pageIndex || 0,
      pageSize: isLocalState
        ? initialState?.pagination?.pageSize || 10
        : searchParams.has(TableQueryParams.ROWS_PER_PAGE)
        ? Number(searchParams.get(TableQueryParams.ROWS_PER_PAGE))
        : initialState?.pagination?.pageSize || 10,
    },
  };
};

const Table2 = <TData extends MRT_RowData>({
  // required props
  columns,
  data = [],

  // MRT table props
  rowCount,
  muiPaginationProps,
  state,
  initialState,
  enablePagination = true,

  // custom props
  isLocalState,
  additionalFilterParams = [],
  isLoading,
  showLoadingOverlay = true,
  recordName = "records",
  singularRecordName = "record",
  onAction,

  // Column pinning
  isColumnPinning = false,
  nameColumnPinning = "",
  isLayoutGridMode,

  ...props
}: Props<TData>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialStates = useMemo(
    () => getInitialState({ initialState, isLocalState, searchParams }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialState, isLocalState]
  );

  const [sorting, setSorting] = useState<MRT_SortingState>(
    () => initialStates.sorting
  );
  const [search, setSearch] = useState<string>(
    () => initialStates.globalFilter
  );
  const [pagination, setPagination] = useState<MRT_PaginationState>(
    () => initialStates.pagination
  );

  const defaultMRTOptions = useMemo(() => getDefaultMRTOptions<TData>(), []);

  useEffect(() => {
    handleTriggerAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, sorting, search, searchParams]);

  const getActionParams = useCallback(() => {
    const searchParamsValue = searchParams.get(TableQueryParams.SEARCH) || "";

    return {
      ...getAdditionalParams(additionalFilterParams, searchParams),
      search: isLocalState ? search?.toString() || "" : searchParamsValue,
      // take: pagination.pageSize || 0,
      // skip: pagination.pageSize * pagination.pageIndex,
      // map for .net api
      pageNo: pagination.pageIndex + 1,
      pageSize: pagination.pageSize || 0,
      order:
        getSortOrderParamsUrlFromState(sorting) ||
        getSortOrderParamsUrlFromState(initialStates.sorting),
    };
  }, [
    additionalFilterParams,
    isLocalState,
    searchParams,
    search,
    pagination,
    sorting,
    initialStates.sorting,
  ]);

  const handleTriggerAction = () => {
    if (!onAction) return;

    const params = getActionParams();
    onAction(params);
  };

  const range = useMemo(() => {
    const end = (pagination.pageIndex + 1) * pagination.pageSize;
    const start = end - (pagination.pageSize - 1);

    if (rowCount < end) return `${start}-${rowCount}`;
    return `${start}-${end}`;
  }, [rowCount, pagination]);

  const setOrDeleteSearchParamsByKey = ({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }) => {
    if (value) {
      searchParams.set(key, value.toString());
    } else {
      searchParams.delete(key);
    }

    setSearchParams(searchParams);
  };

  const resetToFirstPage = () => {
    setPagination((prev) => ({
      pageIndex: 0,
      pageSize: prev.pageSize,
    }));
  };

  const handleSortingChange = (value: MRT_SortingState) => {
    if (!isLocalState) {
      setOrDeleteSearchParamsByKey({
        key: TableQueryParams.SORT,
        value:
          !isEmpty(value) && Array.isArray(value)
            ? `${value[0].id}:${value[0].desc ? "desc" : "asc"}`
            : [],
      });
    }
  };

  useEffect(() => {
    handleSortingChange(sorting);
    resetToFirstPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  //TODO: fix the auto reset page to 0
  useEffect(() => {
    if (!isLocalState) {
      setTimeout(() => {
        table.setPageIndex(initialStates.pagination?.pageIndex);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaginationChange = (value: MRT_PaginationState) => {
    if (!isLocalState) {
      setOrDeleteSearchParamsByKey({
        key: TableQueryParams.PAGE,
        value: value?.pageIndex,
      });
      setOrDeleteSearchParamsByKey({
        key: TableQueryParams.ROWS_PER_PAGE,
        value: value?.pageSize,
      });
    }
  };

  useEffect(() => {
    handlePaginationChange(pagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const table = useMaterialReactTable({
    ...defaultMRTOptions,
    columns,
    data,
    rowCount,
    state: {
      ...state,
      pagination,
      sorting,
      globalFilter: search,
      showLoadingOverlay: showLoadingOverlay ? isLoading : false,
    },
    muiPaginationProps: {
      ...defaultMRTOptions.muiPaginationProps,
      ...muiPaginationProps,
    },

    enableColumnPinning: isColumnPinning,

    enablePagination: enablePagination,

    initialState: {
      ...initialState,

      columnPinning: { right: [nameColumnPinning] },
      //  just use either initialState or state, not both for the same states
      sorting: undefined,
      pagination: undefined,
      globalFilter: undefined,
    },
    ...(isLayoutGridMode && {
      layoutMode: "grid",
      displayColumnDefOptions: {
        "mrt-row-actions": {
          header: "Actions",
          size: 96,
          muiTableBodyCellProps: {
            sx: {
              flex: 1,
            },
          },
          muiTableHeadCellProps: {
            sx: {
              flex: 1,
            },
          },
        },
      },
    }),
    muiTopToolbarProps: {
      sx: {
        background: "transparent",
        "& > .MuiBox-root": {
          p: 0,
        },
      },
    },
    muiTablePaperProps: {
      sx: {
        boxShadow: "none",
        background: "transparent",
      },
    },
    muiBottomToolbarProps: {
      sx: {
        background: "transparent",
        boxShadow: "none",
        '& [for="mrt-rows-per-page"]': {
          fontSize: "14px",
        },
        "& .MuiInputBase-input": {
          fontSize: 14,
          backgroundColor: "white",
          borderRadius: 1,
          border: `1px solid ${COLOR_CODE.GREY_200}`,
          px: 0.5,
          "& :focus": {
            all: "unset",
          },
        },
      },
    },
    muiTableBodyProps: {
      sx: {
        cursor: "pointer",
        "& tr:hover > td": {
          backgroundColor: COLOR_CODE.BG_SURFACE_HOVER,
        },
        "& .MuiTableRow-root": {
          td: {
            backgroundColor: COLOR_CODE.WHITE,
          },
        },
      },
    },
    muiTableHeadRowProps: {
      sx: {
        boxShadow: "none",
        background: "transparent",
        borderRadius: "8px 8px 0 0",
        border: `1px solid ${COLOR_CODE.GREY_200}`,
        "& .MuiTableCell-root": {
          borderBottom: "none",
          "&:first-of-type": {
            borderTopLeftRadius: 8,
          },
          "&:last-of-type": {
            borderTopRightRadius: 8,
          },
        },
      },
    },
    muiTableBodyRowProps: {
      sx: {
        borderLeft: `1px solid ${COLOR_CODE.GREY_200}`,
        borderRight: `1px solid ${COLOR_CODE.GREY_200}`,
        "& .MuiTableCell-root": {
          borderBottom: `1px solid ${COLOR_CODE.GREY_200}`,
        },
        "&:last-of-type": {
          borderRadius: "0 0 8px 8px",
          "& .MuiTableCell-root": {
            "&:first-of-type": {
              borderBottomLeftRadius: 8,
            },
            "&:last-of-type": {
              borderBottomRightRadius: 8,
            },
          },
        },
      },
    },
    muiTableBodyCellProps: {
      sx: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      },
    },
    onGlobalFilterChange: setSearch,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    renderBottomToolbarCustomActions: () => {
      return enablePagination ? (
        rowCount ? (
          <Typo variant="body2" color={COLOR_CODE.DISABLED}>
            Showing {range} of {rowCount}{" "}
            {rowCount === 1 ? singularRecordName : recordName}
          </Typo>
        ) : (
          <Typo variant="body2" color={COLOR_CODE.DISABLED}>
            No records found.
          </Typo>
        )
      ) : (
        <></>
      );
    },

    ...props,
  });

  return (
    <ThemeProvider theme={getMRTTableTheme()}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
};

export { Table2 };
