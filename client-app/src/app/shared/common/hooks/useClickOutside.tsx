/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

/**
 * INSTRUCTION:
 *
 * const clickRef = useRef();
 * useClickOutside(clickRef, handler);
 *
 * return (
 *  <div ref={clickRef}>
 *    {children}
 *  </div>
 * )
 *
 */
const useClickOutside = (ref: React.MutableRefObject<any>, callBack: any) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callBack();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
  return ref.current;
};

export default useClickOutside;
