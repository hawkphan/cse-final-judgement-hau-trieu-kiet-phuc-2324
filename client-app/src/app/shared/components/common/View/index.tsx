import cn from 'classnames';
import React from 'react';

import './styles.scss';

const View: React.FC<ViewProps> = ({
  children,
  className,
  isRow,
  isRowWrap,
  justify = 'flex-start',
  align = '',
  renderIf = true,
  flexGrow = 0,
  forwardRef,
  style,
  fullWidth,
  ...props
}) => {
  if (!renderIf) return null;

  return (
    <div
      ref={forwardRef}
      className={cn(
        'cmp-view',
        {
          [`cmp-view__justify--${justify}`]: justify,
          [`cmp-view__align--${align}`]: align,
          'cmp-view--row': isRow,
          'cmp-view--row-no-wrap': isRowWrap,
          'cmp-view__full-width': fullWidth,
        },
        className,
      )}
      style={{ ...style, flexGrow }}
      {...props}
    >
      {children}
    </div>
  );
};

export type ViewProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  isRow?: boolean;
  justify?:
    | 'center'
    | 'space-between'
    | 'flex-start'
    | 'flex-end'
    | 'space-around'
    | 'space-evenly';
  align?: 'center' | 'flex-start' | 'flex-end';
  renderIf?: boolean;
  flexGrow?: number;
  isRowWrap?: boolean;
  forwardRef?: React.LegacyRef<HTMLDivElement>;
  fullWidth?: boolean;
};

export default View;
