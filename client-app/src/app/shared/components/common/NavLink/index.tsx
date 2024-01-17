import React, { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const CNavView: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  renderIf = true,
  disabled,
  showWaving = false,
  label,
  ...props
}) => {
  if (!renderIf) return null;

  return (
    <NavLink
      className={() => `cmp-nav-link ${disabled ? 'cmp-nav-link--disabled ' : ''}${className}`}
      {...props}
    >
      {showWaving && <WaveIndicator />}
      {children ? (children) : (label)}
    </NavLink>
  );
};

export type Props = {
  label?: string;
  disabled?: boolean;
  className?: string;
  showWaving?: boolean;
  renderIf?: boolean | null;
  to: string;
};

export default CNavView;

const WaveIndicator = () => (
  <div className="wrapper">
    <div className="blob" />
  </div>
);
