/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';

export default () => {
  const [isMounted, setIsMounted] = useState(false);
  const origin =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return '';
  }
  return origin;
};
