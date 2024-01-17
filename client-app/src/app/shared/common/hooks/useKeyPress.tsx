/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(key: string, action: (..._args: any[]) => void) {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onKeyup(e: any) {
      if (e.key === key) action();
    }

    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, [key, action]);
}
/**
 ** How to use:
 *
 * import useKeypress from 'src/hooks/useKeypress';
 *
 * useKeypress('Escape', () => {
    alert('you pressed escape!')
  });
 *
 */
