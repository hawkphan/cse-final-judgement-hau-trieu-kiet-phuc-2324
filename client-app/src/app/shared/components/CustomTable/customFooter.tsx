
import { Pagination, Stack } from '@mui/material';
import cn from 'classnames';
import React, { memo, useMemo } from 'react';
import { COLOR_CODE, Typo, useResponsive } from '../..';
import SelectRowsPerPage from '../common/TableBasic/SelectRowsPerPage';
import { ScreenSize } from '../../common/hooks/useResponsive';
import configs from '../../../configs';

const clsPrefix = 'custom-footer-custom-table';
const CustomFooter: React.FC<Props> = ({
  count,
  page,
  rowsPerPage = configs.ROWS_PER_PAGE,
  recordName = 'records',
  resetPageAfterChange = true,
  rowPerPageOptions = configs.ROWS_PER_PAGE_OPTIONS,
  changeRowsPerPage,
  changePage,
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
      if (resetPageAfterChange) {
        changePage(0);
      }
    },
    [resetPageAfterChange, changePage, changeRowsPerPage],
  );

  const handleChangePage = (_event: object, value: number) => {
    const skip = value > 0 ? value - 1 : value;
    changePage(skip);
  };

  return (
    <Stack
      flexWrap={!isTabletScreen ? 'nowrap' : undefined}
      direction={!isTabletScreen ? 'row' : 'column'}
      alignItems="center"
      justifyContent="space-between"
      className={cn(`${clsPrefix}`, {
        'px-2': !isTabletScreen,
        'py-2': isTabletScreen,
      })}
    >
      <Stack
        flexWrap={!isTabletScreen ? 'nowrap' : undefined}
        direction={!isTabletScreen ? 'row' : 'column'}
        width="100%"
        {...(isTabletScreen && {
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        {count ? (
          <Typo variant="body2" fontWeight={500} color={COLOR_CODE.GREY_600}>
            Showing {range} of {count} {recordName}
          </Typo>
        ) : (
          <div />
        )}
      </Stack>
      <Stack
        direction={!isTabletScreen ? 'row' : 'column'}
        alignItems="center"
        width="100%"
        {...(!isTabletScreen && {
          justifyContent: 'flex-end',
        })}
      >
        <Stack
          direction="row"
          alignItems="center"
          {...(isTabletScreen && {
            width: '100%',
            justifyContent: 'center',
          })}
        >
          <Typo variant="body2" fontWeight={500} color={COLOR_CODE.GREY_600}>
            Rows per page:
          </Typo>
          <SelectRowsPerPage
            options={rowPerPageOptions}
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
          />
        </Stack>
        <Stack
          {...(isTabletScreen && {
            width: '100%',
            justifyContent: 'center',
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
            sx={{
              '& .MuiPagination-ul': {
                justifyContent: 'center',
              },
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

type Props = {
  count: number;
  page: number;
  rowsPerPage?: number;
  rowPerPageOptions?: number[];
  recordName?: string;
  resetPageAfterChange?: boolean;
  changeRowsPerPage: (_page: string | number) => void;
  changePage: (_newPage: number) => void;
};

export default memo(CustomFooter);
