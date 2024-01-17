/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

export default (callback: any, delay: number) => {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (delay !== null) {
      const id = setTimeout(tick, delay);

      return () => clearTimeout(id);
    }
  }, [delay]);
};

/**
 * INSTRUCTION:
 * useTimeout(() => {handler}, 200)
 */
