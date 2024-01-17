/* eslint-disable @typescript-eslint/no-explicit-any */

import { Pagination, TableCell, TableFooter, TableRow, ThemeProvider } from '@mui/material';
import cn from 'classnames';
import React, { useMemo } from 'react';
import { Typo, View } from '..';
import SelectRowsPerPage from './SelectRowsPerPage';
import './styles.scss';
import { COLOR_CODE, useResponsive } from '../../..';
import { ScreenSize } from '../../../common/hooks/useResponsive';

const clsPrefix = 'custom-footer-table';

const CustomFooterRender: React.FC<Props> = ({
  count,
  page,
  rowsPerPage,
  changeRowsPerPage,
  changePage,
  theme,
  addRowButton,
  recordName = 'records',
}) => {
  const isTabletScreen = useResponsive(ScreenSize.TABLET);

  const range = useMemo(() => {
    const end = (page + 1) * rowsPerPage;
    const start = end - (rowsPerPage - 1);
    if (count < end) return `${start}-${count}`;
    return `${start} to ${end}`;
  }, [count, page, rowsPerPage]);

  const handleChangeRowsPerPage = React.useCallback(
    (value: number) => {
      changeRowsPerPage(value);
      changePage(0);
    },
    [changePage, changeRowsPerPage],
  );

  const handleChangePage = (event: object, value: number) => {
    const skip = value > 0 ? value - 1 : value;
    changePage(skip);
  };

  return (
    <ThemeProvider theme={theme}>
      <TableFooter>
        <TableRow>
          <TableCell>
            {addRowButton}
            <View
              isRowWrap={!isTabletScreen}
              align="center"
              justify="space-between"
              className={cn(`${clsPrefix}`, {
                'px-2': !isTabletScreen,
                'py-2': isTabletScreen,
              })}
            >
              <View
                isRowWrap={isTabletScreen}
                fullWidth
                {...(isTabletScreen && {
                  align: 'center',
                  justify: 'center',
                })}
              >
                {count ? (
                  <Typo variant="body2" fontWeight={500} color={COLOR_CODE.GREY_600}>
                    Showing {range} of {count} {recordName}
                  </Typo>
                ) : (
                  <div />
                )}
              </View>
              <View
                isRow
                align="center"
                fullWidth
                {...(!isTabletScreen && {
                  justify: 'flex-end',
                })}
              >
                <View
                  isRow
                  align="center"
                  {...(isTabletScreen && {
                    fullWidth: true,
                    justify: 'center',
                  })}
                >
                  <Typo variant="body2" fontWeight={500} color={COLOR_CODE.GREY_600}>
                    Rows per page:
                  </Typo>
                  <SelectRowsPerPage
                    options={[5, 10, 20, 30, 50]}
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                  />
                </View>
                <View
                  {...(isTabletScreen && {
                    fullWidth: true,
                    justify: 'center',
                  })}
                  style={{ marginTop: '4px' }}
                >
                  <Pagination
                    count={count > 0 ? Math.ceil(count / rowsPerPage) : 1}
                    page={page + 1}
                    shape="rounded"
                    size="small"
                    variant="outlined"
                    onChange={handleChangePage}
                    classes={{
                      root: `${clsPrefix}-pagination`,
                    }}
                  />
                </View>
              </View>
            </View>
          </TableCell>
        </TableRow>
      </TableFooter>
    </ThemeProvider>
  );
};

type Props = {
  count: number;
  page: number;
  rowsPerPage: number;
  changeRowsPerPage: (_page: string | number) => void;
  changePage: (_newPage: number) => void;
  addRowButton?: React.ReactElement;
  theme: any;
  recordName?: string;
};

export default CustomFooterRender;
