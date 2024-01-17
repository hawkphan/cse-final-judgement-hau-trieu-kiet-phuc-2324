import { Typo } from '@components';
import { TableSortLabel } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const SORT_KEY = (key: string) => ({
  ASC: `${key}:asc`,
  DESC: `${key}:desc`,
  KEY: 'order',
});

const TablePaginationDemo: React.FC<Props> = ({ label, headerKey }) => {
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const headerSortKey = SORT_KEY(headerKey);

  const sort = query.get(headerSortKey.KEY);

  const direction =
    sort === headerSortKey.ASC ? 'asc' : sort === headerSortKey.DESC ? 'desc' : undefined;

  const setSort = (newPage: string) => {
    if (newPage) query.set(headerSortKey.KEY, `${newPage}`);
    else query.delete(headerSortKey.KEY);
    history({ search: query.toString() });
  };

  const handleChangeSort = () => {
    switch (sort) {
      case headerSortKey.ASC:
        return setSort(headerSortKey.DESC);
      case headerSortKey.DESC:
        return setSort('');
      default:
        return setSort(headerSortKey.ASC);
    }
  };

  return (
    <TableSortLabel
      direction={direction}
      onClick={handleChangeSort}
      style={{ flexDirection: 'row' }}
      active={!!direction}
    >
      <Typo className="has-text-black">{label}</Typo>
    </TableSortLabel>
  );
};
type Props = {
  label: string;
  headerKey: string;
};

export default TablePaginationDemo;
