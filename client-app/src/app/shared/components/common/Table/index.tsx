/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MUIDataTableColumn,
  MUIDataTableOptions,
  MUIDataTableState,
  MUISortOptions,
} from 'mui-datatables';
import React, { memo } from 'react';
import LocationWrapper from './LocationWrapper';
import StateWrapper from './StateWrapper';
import './styles.scss';

const Table: React.FC<TableProps> = ({ isLocalState, ...props }) => {
  if (isLocalState) return <StateWrapper {...props} />;
  return <LocationWrapper {...props} />;
};

export type TableProps = {
  title?: React.ReactNode;
  data: any[];
  tableOptions: MUIDataTableOptions;
  columns: MUIDataTableColumn[];
  refresh?: boolean | number | string;
  onAction: (..._args: any[]) => void;
  defaultSortOrder?: MUISortOptions;
  isLoading?: boolean;
  emptyComponent?: React.ReactNode;
  viewColumns?: string[];
  additionalFilterParams?: string[];
  filterSeparator?: string;
  defaultState?: Partial<MUIDataTableState>;
  isLocalState?: boolean;
  addRowButton?: React.ReactElement;
  recordName?: string;
};

export default memo(Table);
