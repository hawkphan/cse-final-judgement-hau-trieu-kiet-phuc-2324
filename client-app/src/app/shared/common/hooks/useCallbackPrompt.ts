/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { useBlocker } from './useBlocker';

export const BY_PASS_PARAM_KEY = 'byPass';

function useCallbackPrompt(
  blockCondition: (_nextLocation: Location, _currentLocation: Location) => boolean,
  blockCallback: (..._args: any[]) => void,
): {
  confirmNavigation: (..._args: any[]) => void;
  cancelNavigation: (..._args: any[]) => void;
} {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastLocation, setLastLocation] = useState<{ location: Location }>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const [blocking, setBlocking] = useState(false);

  const cancelNavigation = useCallback(() => {
    setLastLocation(null);
    setBlocking(false);
  }, []);

  // handle blocking when user click on another route prompt will be shown
  const handleBlockedNavigation = useCallback(
    (nextLocation: { location: Location }) => {
      const {
        location: { search },
      } = nextLocation;
      const isByPass = search.includes(BY_PASS_PARAM_KEY);
      // in if condition we are checking next location and current location are equals or not
      setLastLocation(nextLocation);
      if (!blocking) {
        if (!isByPass && !confirmedNavigation && blockCondition(nextLocation.location, location)) {
          setBlocking(true);
          blockCallback(nextLocation.location);
          return false;
        }
        confirmNavigation();
      }
      return true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [confirmedNavigation, location, blocking],
  );

  const confirmNavigation = useCallback(() => {
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      const { location } = lastLocation;
      const query = new URLSearchParams(location.search);
      if (query.has(BY_PASS_PARAM_KEY)) {
        query.delete(BY_PASS_PARAM_KEY);
        navigate({ ...location, search: query.toString() });
      } else navigate(lastLocation.location);
      // Clean-up state on confirmed navigation
      setConfirmedNavigation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmedNavigation, lastLocation]);

  useBlocker(handleBlockedNavigation, true);

  return { confirmNavigation, cancelNavigation };
}

export default useCallbackPrompt;
