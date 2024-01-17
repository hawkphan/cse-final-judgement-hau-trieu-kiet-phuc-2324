/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SxProps,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { FC, Fragment, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { COLOR_CODE, Typo, isEmpty } from "../..";
import EmptyTable from "../EmptyTable";
import Element from "../common/Element";
import CustomFooter from "./customFooter";
import {
  BodyBasicRows,
  BodyRows,
  CellType,
  CustomTableSearchParamsEnum,
  DEFAULT_TABLE_VALUE,
  HeaderRow,
  HeaderRows,
} from "./types";

type CursorType =
  | 'auto'
  | 'default'
  | 'none'
  | 'context-menu'
  | 'help'
  | 'pointer'
  | 'progress'
  | 'wait'
  | 'cell'
  | 'crosshair'
  | 'text'
  | 'vertical-text'
  | 'alias'
  | 'copy'
  | 'move'
  | 'no-drop'
  | 'not-allowed'
  | 'grab'
  | 'grabbing'
  | 'e-resize'
  | 'n-resize'
  | 'ne-resize'
  | 'nw-resize'
  | 's-resize'
  | 'se-resize'
  | 'sw-resize'
  | 'w-resize'
  | 'ew-resize'
  | 'ns-resize'
  | 'nesw-resize'
  | 'nwse-resize'
  | 'col-resize'
  | 'row-resize'
  | 'all-scroll'
  | 'zoom-in'
  | 'zoom-out'
  | 'grab'
  | 'grabbing';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: COLOR_CODE.GREY_200,
    color: theme.palette.common.black,
    padding: "4px 16px",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "4px 16px",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: COLOR_CODE.DEFAULT_BORDER,
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

export const cellBaseStyles = {
  fontSize: 14,
};
export const cellCurrencyValueStyles = {
  ...cellBaseStyles,
  width: 140,
  maxWidth: 140,
  textAlign: "right" as const,
};
export const cellCurrencyInputStyles = {
  ...cellCurrencyValueStyles,
  padding: "4px",
};
export const cellInputStyles = {
  ...cellBaseStyles,
  padding: "4px",
};
export const printCellStyles = {
  ...cellBaseStyles,
  padding: "8px",
  border: "double",
};
export const printCellHeadStyles = {
  ...cellBaseStyles,
  padding: "8px",
  border: "double",
  fontWeight: "bold",
  background: COLOR_CODE.GREY_300,
};
export const printCellRightStyles = {
  ...cellBaseStyles,
  padding: "8px",
  borderRight: "double",
};
export const breakWordStyles = {
  ...cellBaseStyles,
  wordBreak: "break-word",
};
export const defaultCellStyle = {
  padding: "8px 16px",
};

const getDefaultCellStyleByType = (cellType: CellType) => {
  switch (cellType) {
    case CellType.CURRENCY_INPUT:
      return cellCurrencyInputStyles;
    case CellType.CURRENCY_VALUE:
      return cellCurrencyValueStyles;
    case CellType.INPUT:
      return cellInputStyles;
    case CellType.PRINT_CELL:
      return printCellStyles;
    case CellType.PRINT_CELL_HEAD:
      return printCellHeadStyles;
    case CellType.PRINT_CELL_RIGHT:
      return printCellRightStyles;
    case CellType.CELL_BREAK_WORD:
      return breakWordStyles;
    case CellType.DEFAULT:
      return defaultCellStyle;

    default:
      return defaultCellStyle;
  }
};

const renderRows = <
  T extends BodyRows &
    HeaderRows &
    BodyBasicRows & {
      isHeaderRow?: boolean;
    }
>({
  data,
  rowCursor,
  showBorder = false,
  hideRowError = false,
  rowHover = false,
}: {
  data: T;
  showBorder?: boolean;
  hideRowError?: boolean;
  rowHover?: boolean;
  rowCursor?: CursorType;
}) => {
  if (isEmpty(data) || !Array.isArray(data)) return null;

  return data.map((row, rowIndex) => {
    const hasError = !isEmpty(row.errorMessage) && !hideRowError;

    return (
      <Fragment key={`row-table-${rowIndex}-${row?.key || ""}`}>
        <TableRow
          sx={{
            "&:hover": {
              cursor: rowCursor,
              bgcolor: rowHover && "#DFEDF7",
            },
            verticalAlign: "top",
            ...row.style,
            border: hasError ? COLOR_CODE.DEFAULT_ROW_ERROR_BORDER : undefined,
          }}
          className={row.className}
        >
          {row.columns?.map((cell, cellIndex) => {
            if (cell.hide) return null;

            // render subContent
            let subContent;
            if (!cell.subContent) {
              subContent = null;
            } else {
              subContent =
                typeof cell.subContent === "string" ? (
                  <Typo variant="subtitle1" sx={{ color: COLOR_CODE.WHITE }}>
                    {cell.subContent}
                  </Typo>
                ) : (
                  cell.subContent
                );
            }

            // render column as header column
            const isHeaderColumn = row?.isHeaderRow || cell?.isHeaderColumn;

            // get default cell style
            const defaultCellStyle = getDefaultCellStyleByType(cell?.type);

            return (
              <StyledTableCell
                key={`cell-table-${cellIndex}-${cell?.key || ""}`}
                sx={{
                  [`&.${tableCellClasses.root}`]: {
                    ...defaultCellStyle,
                    ...cell.style,
                  },
                  border: showBorder ? COLOR_CODE.DEFAULT_BORDER : undefined,
                }}
                width={cell.width}
                height={cell.height}
                colSpan={cell.colSpan || DEFAULT_TABLE_VALUE.COL_SPAN}
                rowSpan={cell.rowSpan || DEFAULT_TABLE_VALUE.ROW_SPAN}
                className={cell.className}
                {...(isHeaderColumn && {
                  variant: "head",
                })}
              >
                {cell.content}
                {subContent}
              </StyledTableCell>
            );
          })}
        </TableRow>
        {hasError && (
          <TableRow>
            <TableCell
              colSpan={row.columns?.length || DEFAULT_TABLE_VALUE.COL_SPAN}
              sx={{ padding: 1 }}
            >
              <Typo variant="subtitle1" color="error" width="100%">
                {row.errorMessage}
              </Typo>
            </TableCell>
          </TableRow>
        )}
      </Fragment>
    );
  });
};

const EmptyTableBody = ({ headerList }: { headerList: HeaderRows }) => {
  if (isEmpty(headerList))
    return (
      <TableRow>
        <TableCell>
          <EmptyTable />
        </TableCell>
      </TableRow>
    );

  return (
    <TableRow>
      <TableCell
        colSpan={
          !isEmpty(headerList)
            ? // count total col of table
              headerList[0]?.columns?.reduce((output, col) => {
                const currentColSpan =
                  col?.colSpan || DEFAULT_TABLE_VALUE.COL_SPAN;

                return output + currentColSpan;
              }, 0)
            : DEFAULT_TABLE_VALUE.COL_SPAN
        }
      >
        <EmptyTable />
      </TableCell>
    </TableRow>
  );
};

const getActionParams = ({
  rowsPerPage,
  page,
  search,
}: {
  rowsPerPage: number | string;
  page: number;
  search: string;
}) => ({
  search,
  take: Number(rowsPerPage),
  skip: page * Number(rowsPerPage),
});

const Layout: FC<TableLayoutProps> = ({
  tableSx,
  tableCtnSx,
  headerList,
  options = {
    showBorder: false,
    stickyHeader: undefined,
  },
  headerSx,
  data: bodyList,
}) => (
  <TableContainer sx={tableCtnSx}>
    <Table stickyHeader={options.stickyHeader} sx={tableSx}>
      <TableHead sx={headerSx}>
        {renderRows<HeaderRows>({
          data: headerList,
          showBorder: options.showBorder,
        })}
      </TableHead>
      <TableBody>
        {isEmpty(bodyList) ? (
          <EmptyTableBody headerList={headerList} />
        ) : (
          renderRows<BodyRows>({
            data: bodyList,
            showBorder: options.showBorder,
          })
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

const Basic: FC<TableBasicProps> = ({
  tableSx,
  headerSx,
  tableCtnSx,
  data: bodyList,
  errorMessage,
  isLoading,
  emptyHeaderList,
  options = {
    showBorder: false,
    stickyHeader: false,
    pagination: false,
    search: false,
    defaultRowsPerPage: 5,
    rowPerPageOptions: [5, 15, 25, 50],
    count: 0,
    rowHover: false,
    rowCursor: undefined,
    interceptorAction: undefined,
  },
  onAction,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!onAction) return;

    handleTriggerAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const { rowsPerPage, page, search } = useMemo(
    () => ({
      rowsPerPage: Number(
        searchParams.get(CustomTableSearchParamsEnum.ROWS_PER_PAGE) ||
          options.defaultRowsPerPage
      ),
      page: Number(searchParams.get(CustomTableSearchParamsEnum.PAGE) || 0),
      search: searchParams.get(CustomTableSearchParamsEnum.SEARCH),
    }),
    [searchParams, options.defaultRowsPerPage]
  );

  const header: HeaderRow | null = useMemo(
    () =>
      !isEmpty(bodyList)
        ? {
            ...bodyList[0],
            style: bodyList[0].headerStyle,
            className: bodyList[0].headerClassName,
            columns: bodyList[0].columns.map((column) => ({
              key: column.key,
              content: column.label,
              colSpan: column.colSpan,
              rowSpan: column.rowSpan,
              style: column.headerStyle,
              className: column.headerClassName,
              hide: column.hide,
            })),
          }
        : null,
    [bodyList]
  );

  const headerList = useMemo(() => (header ? [header] : []), [header]);

  const handleRowsPerPageChange = useCallback(
    async (rowsPerPage: number | string) => {
      if (options.interceptorAction) {
        const allowContinue = await options.interceptorAction();
        if (!allowContinue) return;
      }

      searchParams.set(
        CustomTableSearchParamsEnum.ROWS_PER_PAGE,
        rowsPerPage.toString()
      );
      searchParams.delete(CustomTableSearchParamsEnum.PAGE);
      setSearchParams(searchParams);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams, setSearchParams, options.interceptorAction]
  );

  const handlePageChange = useCallback(
    async (page: number) => {
      if (options.interceptorAction) {
        const allowContinue = await options.interceptorAction();
        if (!allowContinue) return;
      }

      searchParams.set(CustomTableSearchParamsEnum.PAGE, page.toString());
      setSearchParams(searchParams);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams, setSearchParams, options.interceptorAction]
  );

  const handleTriggerAction = () => {
    const params = getActionParams({
      page,
      rowsPerPage,
      search: options.search ? search : undefined,
    });
    onAction(params);
  };

  return (
    <>
      <TableContainer sx={{ my: 1, ...tableCtnSx }}>
        <Element errorMessage={errorMessage}>
          <Table
            stickyHeader={options.stickyHeader}
            sx={{
              ...tableSx,
              border: errorMessage
                ? COLOR_CODE.DEFAULT_TABLE_ERROR_BORDER
                : undefined,
            }}
          >
            <TableHead sx={headerSx}>
              {!isEmpty(headerList) &&
                renderRows<HeaderRows>({
                  data: headerList,
                  showBorder: options.showBorder,
                  hideRowError: true,
                  rowHover: false,
                })}
              {isEmpty(headerList) &&
                !isEmpty(emptyHeaderList) &&
                renderRows<HeaderRows>({
                  data: emptyHeaderList,
                  showBorder: options.showBorder,
                  hideRowError: true,
                  rowHover: false,
                })}
            </TableHead>
            <TableBody sx={{ opacity: isLoading ? 0.3 : 1 }}>
              {isEmpty(bodyList) ? (
                <EmptyTableBody headerList={emptyHeaderList} />
              ) : (
                renderRows<BodyBasicRows>({
                  data: bodyList,
                  showBorder: options.showBorder,
                  rowHover: options.rowHover,
                  rowCursor: options.rowCursor,
                })
              )}
            </TableBody>
          </Table>
        </Element>
      </TableContainer>

      {options.pagination && (
        <CustomFooter
          count={options.count}
          page={page}
          rowsPerPage={rowsPerPage}
          rowPerPageOptions={options.rowPerPageOptions}
          changeRowsPerPage={handleRowsPerPageChange}
          changePage={handlePageChange}
          resetPageAfterChange={false}
        />
      )}
    </>
  );
};

export interface CustomTableActionParams {
  take: number;
  skip: number;
  search: string;
}

export interface TableLayoutProps {
  data: BodyRows;
  tableSx?: SxProps;
  tableCtnSx?: SxProps;
  headerList?: HeaderRows;
  headerSx?: SxProps;
  errorMessage?: string;
  options: {
    showBorder?: boolean;
    stickyHeader?: boolean;
  };
}
export interface TableBasicProps {
  data: BodyBasicRows;
  errorMessage?: string;
  tableSx?: SxProps;
  tableCtnSx?: SxProps;
  headerSx?: SxProps;
  isLoading?: boolean;
  emptyHeaderList?: HeaderRows;
  options?: {
    showBorder?: boolean;
    stickyHeader?: boolean;
    pagination?: boolean;
    count?: number;
    defaultRowsPerPage?: number;
    rowPerPageOptions?: number[];
    rowHover?: boolean;
    search?: boolean;
    rowCursor?: CursorType;
    /**
     *
     * Interceptor function run before any action inside table component
     *
     * @returns { boolean | Promise<boolean> } allow continue current action
     *
     */
    interceptorAction?: (..._args: any[]) => boolean | Promise<boolean>;
  };
  onAction?: (params: CustomTableActionParams) => void;
}




export default { Layout, Basic };
