/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (onUnmountHandler: any) => {
  useEffect(
    () => () => {
      onUnmountHandler();
    },
    [],
  );
};
