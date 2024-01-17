/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Breadcrumbs, BreadcrumbsProps, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import './styles.scss';
import { COLOR_CODE } from '../../..';

type BreadcrumbItem = {
  id: number | string;
  label: string;
  onClick?: (..._args: any[]) => void;
  href?: string;
};

const CustomBreadcrumbs: React.FC<Props> = ({ items = [], separator = '' }) => {
  const navigate = useNavigate();
  const lastItem = items[items.length - 1];
  const restItems = items.slice(0, items.length - 1);

  return (
    <Breadcrumbs aria-label="breadcrumb" className="cmp-breadcrumbs">
      {restItems.map((item) => (
        <Button
          key={item.id}
          variant="link"
          label={item.label}
          className="cmp-breadcrumbs__item"
          onClick={item.href ? () => navigate(item.href) : item?.onClick}
        />
      ))}
      <Typography fontSize={14} color={COLOR_CODE.GREY_600}>
        {lastItem.label}
      </Typography>
      ,
    </Breadcrumbs>
  );
};

type Props = BreadcrumbsProps & {
  items: BreadcrumbItem[];
  separator?: string | React.ReactNode;
};

export default CustomBreadcrumbs;
