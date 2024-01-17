/* eslint-disable react-refresh/only-export-components */

import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import cn from 'classnames';
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableProps,
  MUIDataTableState,
} from 'mui-datatables';
import React, { memo, useMemo } from 'react';
import CustomFooterRender from './customFooterRender';
import CustomSearchRender from './customSearchRender';
import './styles.scss';
import { COLOR_CODE, Loading, View } from '../../..';

export const getMuiTableTheme = ({
  hasRowClickAction,
  isLoading,
}: {
  hasRowClickAction?: boolean;
  isLoading?: boolean;
}) =>
  createTheme({
    primary: {
      main: COLOR_CODE.PRIMARY,
      dark: COLOR_CODE.PRIMARY_DARK,
      light: COLOR_CODE.PRIMARY_LIGHT,
    },
    secondary: {
      main: COLOR_CODE.SECONDARY,
    },
    typography: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          elevation4: {
            boxShadow: 'none',
          },
          root: {
            backgroundColor: 'transparent',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          hover: {
            cursor: hasRowClickAction ? 'pointer' : 'default',
          },
          root: {
            border: 'none',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '8px 16px',
          },
          body: {
            cursor: hasRowClickAction ? 'pointer' : 'default',
            fontSize: 16,
          },
          head: {
            '&.MuiTableCell-root': {
              backgroundColor: COLOR_CODE.GREY_200,
              color: COLOR_CODE.GREY_800,
              fontWeight: 'bold',
              padding: '4px 16px',
            },
            '&.MuiTableCell-root span button': {
              color: COLOR_CODE.GREY_800,
              fontWeight: 'bold',
            },
            '&.MuiTableCell-root span button div, &.MuiTableCell-root span button div span svg': {
              color: `${COLOR_CODE.GREY_800} !important`,
              fontWeight: 'bold',
            },
            button: {
              fontSize: 16,
            },
            div: {
              fontSize: 16,
            },
          },
          footer: {
            '&.MuiTableCell-root': {
              border: 'none',
              padding: '6px 0',
            },
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            opacity: isLoading ? 0.3 : 1,
          },
        },
      },
      MUIDataTableBodyRow: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',
            // 'td:first-child': {
            //   borderTopLeftRadius: 16,
            //   borderBottomLeftRadius: 16,
            // },
            // 'td:last-child': {
            //   borderTopRightRadius: 16,
            //   borderBottomRightRadius: 16,
            // },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            // Hide Chip filter
            // '&.MuiChip-filled.MuiChip-colorDefault.MuiChip-deletable': {
            //   display: 'none !important',
            // },
            backgroundColor: 'transparent',
            border: '1px solid #808280',
            marginLeft: '8px',
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '14px',
            color: '#808280',
            borderRadius: '16px !important',

            '&:hover': {
              backgroundColor: '#DFEDF7',
            },
          },
          deleteIcon: {
            color: '#B3CFE5',
          },
        },
      },
      MUIDataTableFilterList: {
        styleOverrides: {
          root: {
            margin: '0px !important',
            marginBottom: '16px !important',
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            padding: '0 0px !important',
          },
        },
      },
      MUIDataTableToolbar: {
        styleOverrides: {
          filterPaper: {
            minHeight: '344px !important',
          },
        },
      },
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            span: {
              wordBreak: 'break-word',
            },
          },
        },
      },
      MUIDataTableHeadCell: {
        styleOverrides: {
          data: {
            textAlign: 'left',
          },
        },
      },
    },
  } as ThemeOptions);

const TableBasic: React.FC<Props> = ({
  isLoading,
  containerClassName,
  onTableChange,
  options,
  emptyComponent = 'No data',
  data,
  locationSearch,
  addRowButton,
  recordName,
  ...props
}) => {
  const hasRowClickAction = !!options?.onRowClick;

  const tableOptions: MUIDataTableOptions = {
    serverSide: true,
    searchOpen: false,
    search: true,
    download: false,
    filter: true,
    print: false,
    viewColumns: false,
    selectableRowsHeader: false,
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: isLoading ? <Loading variant="primary" /> : emptyComponent,
      },
    },
    jumpToPage: false,
    rowHover: true,
    onTableChange,
    customSearchRender: (searchText: string, handleSearch: (_text: string) => void) => (
      <CustomSearchRender
        searchText={searchText}
        onSearch={handleSearch}
        placeholder={options.searchPlaceholder}
      />
    ),
    customFooter: (
      count: number,
      page: number,
      rowsPerPage: number,
      changeRowsPerPage: (_page: string | number) => void,
      changePage: (_newPage: number) => void,
    ) => (
      <CustomFooterRender
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        changeRowsPerPage={changeRowsPerPage}
        changePage={changePage}
        theme={getMuiTableTheme({ hasRowClickAction, isLoading })}
        addRowButton={addRowButton}
        recordName={recordName}
      />
    ),
    ...options,
  };

  const muiDataTable = useMemo(
    () => <MUIDataTable options={tableOptions} data={data} {...props} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, isLoading, locationSearch],
  );

  // More info: https://github.com/gregnb/mui-datatables
  return (
    <View className={cn('cmp-table-basic', containerClassName)} flexGrow={1}>
      <ThemeProvider theme={getMuiTableTheme({ hasRowClickAction, isLoading })}>
        {muiDataTable}
        {/* <MUIDataTable options={tableOptions} {...props} /> */}
      </ThemeProvider>
    </View>
  );
};

type Props = MUIDataTableProps & {
  containerClassName?: string;
  currentPage?: number;
  total?: number;
  onTableChange: (_action: string, _tableState: MUIDataTableState) => void;
  isLoading?: boolean;
  emptyComponent?: React.ReactNode;
  locationSearch: string;
  addRowButton?: React.ReactElement;
  recordName?: string;
};

export default memo(TableBasic);
