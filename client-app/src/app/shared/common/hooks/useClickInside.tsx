/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

export default (ref: React.MutableRefObject<any>, callBack: any) => {
  const handleClick = (e: any) => {
    if (ref.current && ref.current.contains(e.target)) {
      callBack();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
  return ref.current;
};

/**
 * INSTRUCTION:
 *
 * const clickRef = useRef();
 * useClickInside(clickRef, hanler);
 *
 * return (
 *  <div ref={clickRef}>
 *    {children}
 *  </div>
 * )
 *
 */
