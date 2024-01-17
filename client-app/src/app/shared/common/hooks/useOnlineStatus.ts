import { useSyncExternalStore } from 'react';

export default function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  return isOnline;
}

const getSnapshot = () => navigator.onLine;
const subscribe = (callback: (this: Window, ev: Event) => void) => {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);

  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
};

// Deprecated
// import { useState } from 'react';
// import { useEventListener } from './useEventListener';

// export default function useOnlineStatus() {
//   const [online, setOnline] = useState(navigator.onLine);

//   useEventListener('online', () => setOnline(navigator.onLine));
//   useEventListener('offline', () => setOnline(navigator.onLine));

//   return online;
// }
