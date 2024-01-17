import { HIDE_NAV_PATHS } from '@app-config/paths';
import cn from 'classnames';
import { FC, HTMLProps, PropsWithChildren } from 'react';
import { useProSidebar } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/redux/rootReducer';
import { usePathname } from '../../common';
import View from '../common/View';
import './styles.scss';

const Screen: FC<Props> = ({ children }) => {
  const { pathname } = usePathname();
  const { toggled, collapsed, broken } = useProSidebar();
  const { showNavbar, showMiniSidebar } = useSelector((state: IRootState) => state.common);

  const isHideNav = HIDE_NAV_PATHS.includes(pathname);

  return (
    <View
      className={cn('cmp-screen', {
        'cmp-screen__navbar': showNavbar && !isHideNav,
        'cmp-screen__sidebar': toggled && !broken,
        'is-collapse': collapsed,
        'is-mini': showMiniSidebar,
      })}
    >
      {children}
    </View>
  );
};

type Props = PropsWithChildren & HTMLProps<HTMLDivElement>;

export default Screen;
