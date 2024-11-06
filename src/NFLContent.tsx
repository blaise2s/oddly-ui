import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { NFLTabs } from './nflConstants';
import { useNFLContext } from './NFLContext';
import { NFLGamesTable } from './NFLGamesTable';
import { useFetchNflGames } from './nflServices';
import { NFLStats } from './NFLStats';
import { NFLTabId, NFLTabIds } from './nflTypes';
import { getSelectedTeamNames } from './nflUtils';
import { TabPanel } from './TabPanel';

export const NFLContent = () => {
  const { seasons, teams, headToHeadSelected } = useNFLContext();

  const { data: games, isFetching: loadingGames } = useFetchNflGames({
    seasons: seasons.reduce<number[]>((accumulator, season) => {
      if (season.selected) {
        accumulator.push(season.year);
      }
      return accumulator;
    }, []),
    teams: getSelectedTeamNames(teams),
    headToHead: headToHeadSelected,
  });

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
    </>
  );
};
