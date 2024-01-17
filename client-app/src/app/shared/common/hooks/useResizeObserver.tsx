import { useEffect, useRef, useState } from 'react';

// The custom hook is defined as useResizeObserver.
const useResizeObserver = () => {
  // The height state is initialized with a value of 0.
  const [height, setHeight] = useState(0);

  // The useRef hook is used to create a reference to the observed div, stored in observedDiv.
  const observedDiv = useRef(null);

  /**
   *  The useEffect hook is used to observe changes in the div's height.
   *  The resizeObserver is instantiated inside the useEffect hook.
   *  The event handler compares the observed div's offsetHeight with the
   *  current height state and updates it if they differ.
   */

  useEffect(() => {
    if (!observedDiv.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      if (observedDiv.current?.offsetHeight !== height) {
        setHeight(observedDiv.current?.offsetHeight);
      }
    });

    // The resizeObserver starts observing the div by calling observe(observedDiv.current).
    resizeObserver.observe(observedDiv.current);

    // The cleanup function is returned from the useEffect hook
    // to disconnect the resizeObserver when the component unmounts.
    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [height]);

  return { height, observedDiv };
};

export default useResizeObserver;

// EXAMPLE FOR USE THIS HOOK
// import React from 'react';
// import useResizeObserver from './useResizeObserver';

// const MyComponent = () => {
//   const { height, observedDiv } = useResizeObserver();

//   return <div ref={observedDiv}>Height: {height}</div>;
// };

// export default MyComponent;
