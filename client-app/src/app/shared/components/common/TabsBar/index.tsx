/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Stack, Tab, Tabs } from '@mui/material';
import React, { ReactNode } from 'react';

import Typo from '../Typo';
import { COLOR_CODE } from '../../..';

export interface TabList {
  label: ReactNode;
  value: string;
  hidden?: boolean;
  count?: number;
}

const TabsBar: React.FC<Props> = ({
  value,
  tabsList,
  buttons,
  color = 'primary',
  onChange,
  countStyle = {
    borderRadius: '16px',
    color: COLOR_CODE.WHITE,
    background: COLOR_CODE.PRIMARY,
    fontSize: 12,
    alignSelf: 'center',
    padding: '0px 4px',
    marginLeft: '4px',
  },
}) => {
  return (
    <Stack justifyContent="space-between" sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value || false}
        indicatorColor={color}
        textColor={color}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          maxWidth: '92vw',
          alignItems: 'self-end',
        }}
        TabIndicatorProps={{
          sx: {
            '&.MuiTabs-indicator': {
              bgcolor: COLOR_CODE.PRIMARY,
            },
          },
        }}
      >
        {tabsList.map((tab, _index) => {
          if (tab.hidden) return null;
          return (
            <Tab
              label={
                tab.count ? (
                  <Stack direction="row">
                    <Typo>{tab.label}</Typo>
                    <Stack style={countStyle}>{tab.count}</Stack>
                  </Stack>
                ) : (
                  <span>{tab.label}</span>
                )
              }
              value={tab.value}
              sx={{
                minWidth: '58px',
                minHeight: '40px',
                fontSize: '16px',
                textTransform: 'capitalize',
                padding: '8px 16px',
                fontWeight: 700,
                color: COLOR_CODE.GREY_600,
                '&.Mui-selected': {
                  color: COLOR_CODE.PRIMARY,
                  borderBottom: `3px solid ${COLOR_CODE.PRIMARY}`,
                },
              }}
              key={tab.value}
            />
          );
        })}
      </Tabs>

      {buttons}
    </Stack>
  );
};

type Props = {
  value: string;
  tabsList: TabList[];
  buttons?: React.ReactNode;
  color?: 'primary' | 'secondary';
  dataLength?: number;
  onChange?: (..._args: any[]) => void;
  countStyle?: React.CSSProperties;
};

export default TabsBar;
