import { isEmpty } from 'lodash';

export enum TableQueryParams {
  SEARCH = 'search',
  ROWS_PER_PAGE = 'rowsPerPage',
  PAGE = 'page',
  SORT = 'sort',
  FILTER = 'filter',
}
export const getAdditionalParams = (filterList: string[], query: URLSearchParams) => {
  if (isEmpty(filterList)) return {};

  return filterList.reduce((state, key) => {
    const value = query.getAll(key);
    if (value) {
      return {
        ...state,
        [key]: value?.filter((item) => !!item),
      };
    }
    return state;
  }, {});
};
