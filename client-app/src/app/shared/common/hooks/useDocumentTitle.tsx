/* eslint-disable react-refresh/only-export-components */
import { useLayoutEffect } from 'react';

export default (title: string) => {
  useLayoutEffect(() => {
    window.document.title = title;
  }, [title]);
};
