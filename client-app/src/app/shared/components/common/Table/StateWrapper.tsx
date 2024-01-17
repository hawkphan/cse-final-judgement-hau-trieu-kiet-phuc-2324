/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { MUIDataTableColumn, MUIDataTableState } from "mui-datatables";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { TableProps } from ".";
import TableBasic from "../TableBasic";
import "./styles.scss";
import { isEmpty } from "../../..";

const getInitialTableState = (
  defaultState: Partial<MUIDataTableState>
): Partial<MUIDataTableState> => ({
  searchText: "",
  sortOrder: null,
  rowsPerPageOptions: [5, 10, 20, 30, 50],
  rowsPerPage: 10,
  page: 0,
  ...defaultState,
});

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
const getAdditionalParams = (
  filterList: string[],
  currentState: { [key: string]: any }
) => {
  if (isEmpty(filterList)) return {};

  return filterList.reduce((state, key) => {
    const value = currentState[key];
    if (value) {
      return {
        ...state,
        [key]: JSON.parse(value),
      };
    }
    return state;
  }, {});
};
const StateWrapper: React.FC<TableProps> = ({
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
  addRowButton,
  //   filterSeparator = ',',
  defaultState = {},
  recordName,
}) => {
  const tableStateRef = useRef<MUIDataTableState>();

  const [currentState, setCurrentState] = useState<Partial<MUIDataTableState>>(
    getInitialTableState(defaultState)
  );

  useEffect(() => {
    if (refresh) {
      handleTriggerAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState]);

  const getActionParams = useCallback(
    (currentState: Partial<MUIDataTableState>) => {
      const currentFilterList = currentState.filterList;
      const rowsPerPage = currentState?.rowsPerPage;
      const page = currentState?.page;
      const searchText = currentState?.searchText;

      const filterTableParams = getFilterParams(currentFilterList, columns);
      const additionalParams = getAdditionalParams(
        additionalFilterParams,
        currentState
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

  const handleTriggerAction = () => {
    const params = getActionParams(currentState);
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
      case "search":
      case "resetFilters":
        setCurrentState(tableState);
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
          filterList: currentState.filterList?.[index],
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
      locationSearch=""
      addRowButton={addRowButton}
      recordName={recordName}
    />
  );
};

export default memo(StateWrapper);
