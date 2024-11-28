import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { TabPanel } from '../common/TabPanel/TabPanel';
import { NFLTabs } from './nflConstants';
import { useNFLContext } from './NFLContext';
import { NFLGamesTable } from './NFLGamesTable';
import { useFetchNflGames } from './nflServices';
import { NFLStats } from './NFLStats';
import { NFLTabId, NFLTabIds } from './nflTypes';
import { getSelectedTeamNames } from './nflUtils';

export const NFLContent = () => {
  const { seasons, teams, headToHeadSelected, gameOrderMap } = useNFLContext();

  const { data: games, isFetching: loadingGames } = useFetchNflGames({
    seasons: seasons.reduce<number[]>((accumulator, season) => {
      if (season.selected) {
        accumulator.push(season.year);
      }
      return accumulator;
    }, []),
    teams: getSelectedTeamNames(teams),
    orders: Array.from(gameOrderMap.entries())
      .sort(([, { priority: p1 }], [, { priority: p2 }]) => {
        return p1 - p2;
      })
      .map(([by, { sort }]) => {
        return { by, sort };
      }),
    headToHead: headToHeadSelected,
  });

  const [activeTabId, setActiveTabId] = useState<NFLTabId>(NFLTabIds.Games);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <TabPanel
          activeTabId={activeTabId}
          tabId={NFLTabIds.Games}
          sx={{ height: '100%' }}
          loading={loadingGames}
        >
          <NFLGamesTable games={games} />
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
    </Box>
  );
};
