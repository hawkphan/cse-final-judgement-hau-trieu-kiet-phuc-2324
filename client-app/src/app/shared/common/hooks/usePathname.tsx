import { useLocation } from 'react-router-dom';

export default function usePathname(): { pathname: string; search: string } {
  const location = useLocation();
  const { pathname, search } = location;
  return { pathname, search };
}

/**
 ** How to use:
 *
 * import {usePathname} from 'src/hooks';
 *
 * const {pathname, search} = usePathname();
 *
 * return(
 *  <h1>Pathname: {pathname}</h1> >> /dev
 *  <h1>Pathname: {search}</h1> >> ?page=2&abc=2
 *  <h1>Pathname: {pathname}{search}</h1> >> /dev?page=2&abc=2
 * )
 */
