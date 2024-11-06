import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { NFLTabIds, NFLTabs } from './nflConstants';
import { NFLGameTable } from './NFLGameTable';
import { NFLStats } from './NFLStats';
import { NFLGame, NFLTabId } from './nflTypes';
import { TabPanel } from './TabPanel';

interface NFLContentProps {
  games?: NFLGame[];
  loadingGames?: boolean;
}

export const NFLContent = ({ games, loadingGames }: NFLContentProps) => {
  const [activeTabId, setActiveTabId] = useState<NFLTabId>(NFLTabIds.Games);

  return (
    <>
      <Tabs
        value={activeTabId}
        onChange={(_, tabId) => setActiveTabId(tabId)}
        textColor='primary'
        indicatorColor='secondary'
        variant='fullWidth'
      >
        {NFLTabs.map(({ tabId, label }) => {
          return <Tab key={tabId} value={tabId} label={label} />;
        })}
      </Tabs>
      <Box flex='1' overflow='auto'>
        <TabPanel
          activeTabId={activeTabId}
          tabId={NFLTabIds.Games}
          sx={{ height: '100%' }}
          loading={loadingGames}
        >
          <NFLGameTable games={games} />
        </TabPanel>
        <TabPanel
          activeTabId={activeTabId}
          tabId={NFLTabIds.Stats}
          sx={{ height: '100%' }}
          loading={loadingGames}
        >
          <NFLStats games={games} />
        </TabPanel>
      </Box>
    </>
  );
};
