/* eslint-disable @typescript-eslint/no-explicit-any */

import { flatten } from "lodash";
import {
  MUIDataTableColumn,
  MUIDataTableOptions,
  MUIDataTableState,
  MUISortOptions,
} from "mui-datatables";
import React, { memo, useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TableProps } from ".";
import { TableQueryParams, getAdditionalParams } from "./helpers";
import "./styles.scss";
import { TableBasic, isEmpty } from "../../..";

const getInitialTableState = (
  queryParams: URLSearchParams,
  defaultSortOrder?: MUISortOptions
): Partial<MUIDataTableOptions> => {
  let sortOrder: MUISortOptions;
  if (queryParams?.get("sort")?.includes(":")) {
    const sortOrderSplit = queryParams?.get("sort")?.split(":");
    if (
      sortOrderSplit.length === 2 &&
      ["asc", "desc"].includes(sortOrderSplit[1])
    ) {
      sortOrder = {
        name: sortOrderSplit[0],
        direction: sortOrderSplit[1] as MUISortOptions["direction"],
      };
    }
  } else {
    sortOrder = defaultSortOrder;
  }

  return {
    searchText: queryParams?.get("search")?.trim(),
    sortOrder,
    rowsPerPageOptions: [5, 10, 20, 30, 50],
    rowsPerPage: queryParams?.has("rowsPerPage")
      ? Number(queryParams.get("rowsPerPage"))
      : 10,
    page: queryParams?.has("page") ? Number(queryParams.get("page")) : 0,
  };
};

const getFilterParams = (
  filterList?: string[][],
  columns: MUIDataTableColumn[] = []
) => {
  if (!filterList) return {};
  const params: any = {};

  filterList.forEach((filter: string[], idx: number) => {
    if (filter.length > 0) {
      const column = columns[idx];
      const name = column?.name;
      params[name] = filter;
    }
  });

  return params;
};

const LocationWrapper: React.FC<TableProps> = ({
  isLoading,
  title,
  data,
  tableOptions,
  columns,
  refresh = true,
  defaultSortOrder,
  emptyComponent,
  onAction,
  additionalFilterParams = [],
  filterSeparator = ",",
  addRowButton,
  recordName,
}) => {
  const history = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const tableStateRef = useRef<MUIDataTableState>();

  useEffect(() => {
    if (refresh) {
      handleTriggerAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, search]);

  const currentState: Partial<MUIDataTableOptions> = getInitialTableState(
    query,
    defaultSortOrder
  );

  const currentFilterList = query
    ?.getAll("filter")
    ?.map((f) => (f ? f.split(filterSeparator) : []));

  const getActionParams = useCallback(
    (
      currentState: Partial<MUIDataTableOptions>,
      currentFilterList: string[][],
      query: URLSearchParams
    ) => {
      const rowsPerPage = currentState?.rowsPerPage;
      const page = currentState?.page;
      const searchText = currentState?.searchText;

      const filterTableParams = getFilterParams(currentFilterList, columns);
      const additionalParams = getAdditionalParams(
        additionalFilterParams,
        query
      );

      let orderParam = null;
      if (
        !isEmpty(currentState?.sortOrder?.name) &&
        !isEmpty(currentState?.sortOrder?.direction)
      ) {
        orderParam = `${currentState?.sortOrder?.name}:${currentState?.sortOrder?.direction}`;
      }

      const params = {
        take: rowsPerPage,
        skip: page * rowsPerPage,
        sort: currentState?.sortOrder?.name || defaultSortOrder?.name,
        order: orderParam,
        search: searchText,
        ...filterTableParams,
        ...additionalParams,
      };

      return params;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const setQueryParams = useCallback(
    (tableState: MUIDataTableState, query: URLSearchParams) => {
      if (tableState?.searchText) {
        query.set(TableQueryParams.SEARCH, tableState.searchText);
      } else {
        query.delete(TableQueryParams.SEARCH);
      }

      if (tableState?.rowsPerPage) {
        const rowsPerPage = tableState.rowsPerPage.toString();
        query.set(TableQueryParams.ROWS_PER_PAGE, rowsPerPage);
      } else {
        query.delete(TableQueryParams.ROWS_PER_PAGE);
      }

      if (tableState?.page) {
        const page = tableState.page.toString();
        query.set(TableQueryParams.PAGE, page);
      } else {
        query.delete(TableQueryParams.PAGE);
      }

      if (tableState?.sortOrder.name && tableState?.sortOrder.direction) {
        const sort = `${tableState?.sortOrder.name}:${tableState?.sortOrder.direction}`;
        query.set(TableQueryParams.SORT, sort);
      } else {
        query.delete(TableQueryParams.SORT);
      }

      if (tableState?.filterList && flatten(tableState.filterList).length > 0) {
        query.delete(TableQueryParams.FILTER);
        tableState.filterList.forEach((f) => {
          query.append(TableQueryParams.FILTER, f.join(filterSeparator));
        });
      } else {
        query.delete(TableQueryParams.FILTER);
      }

      return history({ search: query.toString() });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );

  const handleTriggerAction = () => {
    const params = getActionParams(currentState, currentFilterList, query);
    onAction(params);
  };

  const handleTableChange = async (
    action: any,
    tableState: MUIDataTableState
  ) => {
    tableStateRef.current = tableState;
    switch (action) {
      case "sort":
      case "filterChange":
      case "changeRowsPerPage":
      case "changePage":
      case "resetFilters":
        // eslint-disable-next-line no-param-reassign
        tableState.searchText = query.get(TableQueryParams.SEARCH) ?? "";
        setQueryParams(tableState, query);
        break;
      case "search":
        setQueryParams(tableState, query);
        break;
      default:
        break;
    }
  };

  return (
    <TableBasic
      title={title}
      data={data}
      columns={columns?.map((c, index) => ({
        ...c,
        options: {
          ...c.options,
          filterList: currentFilterList[index],
          // display:
          //   isEmpty(viewColumns) || !c.name
          //     ? 'true'
          //     : (`${viewColumns?.includes(c.name)}` as Display),
        },
      }))}
      options={{ ...tableOptions, ...currentState }}
      onTableChange={handleTableChange}
      containerClassName="cmp-table"
      isLoading={isLoading}
      emptyComponent={emptyComponent}
      locationSearch={search}
      addRowButton={addRowButton}
      recordName={recordName}
    />
  );
};

export default memo(LocationWrapper);
