/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Divider } from '@mui/material';
import { FC, Suspense, lazy, useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatedTabPanel, TabsBar } from '../../shared';


export enum DevContainerParams {
  TAB = 'tab',
}

export enum DevContainerTab {
  COMMON = 'COMMON',
  DIALOG = 'DIALOG',
  TOAST = 'TOAST',
  TAG = 'TAG',
  TAB_BARS = 'TAB_BARS',
  MATERIAL_REACT_TABLE = 'MATERIAL_REACT_TABLE',
  CHART = 'CHART',
}

const TAB_LIST = [
  {
    label: 'Common',
    value: DevContainerTab.COMMON,
  },
  {
    label: 'Dialog',
    value: DevContainerTab.DIALOG,
  },
  {
    label: 'Toast',
    value: DevContainerTab.TOAST,
  },
  {
    label: 'Tag',
    value: DevContainerTab.TAG,
  },
  {
    label: 'TabBars',
    value: DevContainerTab.TAB_BARS,
  },
  {
    label: 'Material React Table',
    value: DevContainerTab.MATERIAL_REACT_TABLE,
  },
  {
    label: 'Chart',
    value: DevContainerTab.CHART,
  },
];

const Common = lazy(() => import('./Common'));
const MaterialReactTable = lazy(() => import('./MaterialReactTable'));
const Dialog = lazy(() => import('./Dialog'));
const Toast = lazy(() => import('./Toast'));
const Tag = lazy(() => import('./Tag'));
const TabBars = lazy(() => import('./TabBars'));
const Chart = lazy(() => import('./Chart'));

const Developer: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = useMemo(
    () => searchParams.get(DevContainerParams.TAB) || DevContainerTab.COMMON,
    [searchParams],
  );
  const [tab, setTab] = useState(defaultTab);

  const handleChangeTab = (_: any, value: string) => {
    setTab(value);
    searchParams.set(DevContainerParams.TAB, value);
    setSearchParams(searchParams);
  };

  const getBodyRender = useCallback(() => {
    switch (tab) {
      case DevContainerTab.COMMON:
        return <Common />;
      case DevContainerTab.DIALOG:
        return <Dialog />;
      case DevContainerTab.TOAST:
        return <Toast />;
      case DevContainerTab.TAG:
        return <Tag />;
      case DevContainerTab.TAB_BARS:
        return <TabBars />;
      case DevContainerTab.MATERIAL_REACT_TABLE:
        return <MaterialReactTable />;
      case DevContainerTab.CHART:
        return <Chart />;
      default:
        return <Common />;
    }
  }, [tab]);

  return (
    <Box px={3} py={'2px'}>
      <Suspense fallback={<div>Loading...</div>}>
        <TabsBar tabsList={TAB_LIST} onChange={handleChangeTab} value={tab} />
        <Divider sx={{ mb: 1 }} />
        <AnimatedTabPanel uniqKey={`multi-lang-${tab}`} transitionTime={0.2}>
          {getBodyRender()}
        </AnimatedTabPanel>
      </Suspense>
    </Box>
  );
};

export default Developer;
