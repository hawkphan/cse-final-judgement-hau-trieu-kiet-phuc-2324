/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';


const LazyCheckPoint: React.FC<PropsWithChildren<Props>> = ({
  children,
  onFirstEnter,
  refreshValue = null,
}) => {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (refreshValue) {
      setEntered(false);
    }
  }, [refreshValue]);

  const handleEnterView = (args: any) => {
    if (!entered) {
      onFirstEnter(args);
      setEntered(true);
    }
  };
  return <Waypoint onEnter={handleEnterView}>{children}</Waypoint>;
};

type Props = {
  onFirstEnter: (..._args: any[]) => void;
  refreshValue?: any;
};

export default LazyCheckPoint;
