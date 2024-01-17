import { Box, Card, CardContent, Stack } from '@mui/material';
import { useState } from 'react';
import { AnimatedTabPanel, TabsBar, Typo } from '../../../shared';

const TemplateTabBars = () => {
  const [tab, setTab] = useState('tab1');
  return (
    <Box>
      <Stack mb={3}>
        <Typo>Tab bars Local State</Typo>
        <TabsBar
          tabsList={[
            {
              label: 'Tab 1',
              value: 'tab1',
            },
            {
              label: 'Tab 2',
              value: 'tab2',
            },
            {
              label: 'Tab 3',
              value: 'tab3',
            },
            {
              label: 'Tab 4',
              value: 'tab4',
            },
          ]}
          value={tab}
          onChange={(e, value) => {
            setTab(value);
          }}
        />

        <AnimatedTabPanel uniqKey={`userType-${tab}`} transitionTime={0.2}>
          {tab === 'tab1' && (
            <Card>
              <CardContent>Content 1</CardContent>
            </Card>
          )}
          {tab === 'tab2' && (
            <Card>
              <CardContent>Content 2</CardContent>
            </Card>
          )}
          {tab === 'tab3' && (
            <Card>
              <CardContent>Content 3</CardContent>
            </Card>
          )}
          {tab === 'tab4' && (
            <Card>
              <CardContent>Content 4</CardContent>
            </Card>
          )}
        </AnimatedTabPanel>
      </Stack>

      <Stack>
        <Typo>Tab bars query state</Typo>
        <code>View logic and component in src/containers/Dev/index.tsx</code>
      </Stack>
    </Box>
  );
};

export default TemplateTabBars;
