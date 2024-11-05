import NumbersIcon from '@mui/icons-material/Numbers';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import {
  Box,
  CircularProgress,
  Divider,
  Tab as MuiTab,
  Tabs as MuiTabs,
  SxProps,
} from '@mui/material';
import { ReactNode, useState } from 'react';
import { FilterList } from './FilterList';
import { NFL_SEASONS, NFL_TEAMS } from './nflConstants';
import { NFLGameTable } from './NFLGameTable';
import { useFetchNflGames } from './nflServices';
import { NFLTeam } from './nflTypes';
import { NFLStats } from './NFLStats';

const TabIds = {
  Games: 'games',
  Stats: 'stats',
} as const;
type TabId = (typeof TabIds)[keyof typeof TabIds];

interface TabPanelProps {
  tabId: TabId;
  activeTabId: TabId;
  children?: ReactNode;
  sx?: SxProps;
  loading?: boolean;
}

const TabPanel = ({
  tabId,
  activeTabId,
  children,
  sx,
  loading,
}: TabPanelProps) => {
  const hidden = activeTabId !== tabId;
  return (
    <Box role='tabpanel' hidden={hidden} sx={sx}>
      {loading ? (
        <Box
          height='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <CircularProgress />
        </Box>
      ) : (
        <>{!hidden && children}</>
      )}
    </Box>
  );
};

interface Tab {
  tabId: TabId;
  label: string;
}

const Tabs: Tab[] = [
  {
    tabId: TabIds.Games,
    label: 'Games',
  },
  {
    tabId: TabIds.Stats,
    label: 'Stats',
  },
];

const InitiallySelectedSeasonsIndices = [0];
const InitiallySelectedTeamIndices = [11];

export const NFL = () => {
  const [activeTabId, setActiveTabId] = useState<TabId>(TabIds.Games);
  const [selectedSeasons, setSelectedSeasons] = useState<number[]>([
    ...InitiallySelectedSeasonsIndices.map((idx) => NFL_SEASONS[idx]),
  ]);
  const [selectedTeams, setSelectedTeams] = useState<NFLTeam[]>([
    ...InitiallySelectedTeamIndices.map((idx) => NFL_TEAMS[idx]),
  ]);

  const { data: games, isFetching: loadingGames } = useFetchNflGames({
    seasons: selectedSeasons,
    teams: selectedTeams.map((team) => team.name),
  });

  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      <Box
        sx={(theme) => {
          return {
            width: '18rem',
            borderRight: `1px solid ${theme.palette.grey[300]}`,
            backgroundColor: `${theme.palette.grey[100]}`,
            overflow: 'auto',
          };
        }}
      >
        <FilterList
          items={NFL_SEASONS}
          onSelected={(selectedSeasons) => setSelectedSeasons(selectedSeasons)}
          initialSelectedIndices={InitiallySelectedSeasonsIndices}
          expandable={{
            listName: 'Seasons',
            icon: <NumbersIcon />,
          }}
          selectionMin={1}
          selectionMax={5}
        />
        <Divider />
        <FilterList
          items={NFL_TEAMS}
          textProp='name'
          imageProp='image'
          onSelected={(selectedTeams) => setSelectedTeams(selectedTeams)}
          initialSelectedIndices={InitiallySelectedTeamIndices}
          expandable={{
            listName: 'Teams',
            startOpen: true,
            icon: <SportsFootballIcon />,
          }}
        />
        <Divider />
      </Box>
      <Box sx={{ flex: '1', overflow: 'auto' }}>
        <Box height='100%' display='flex' flexDirection='column'>
          <MuiTabs
            value={activeTabId}
            onChange={(_, tabId) => setActiveTabId(tabId)}
            textColor='primary'
            indicatorColor='secondary'
            variant='fullWidth'
          >
            {Tabs.map(({ tabId, label }) => {
              return <MuiTab key={tabId} value={tabId} label={label} />;
            })}
          </MuiTabs>
          <Box flex='1' overflow='auto'>
            <TabPanel
              activeTabId={activeTabId}
              tabId={TabIds.Games}
              sx={{ height: '100%' }}
              loading={loadingGames}
            >
              <NFLGameTable games={games} />
            </TabPanel>
            <TabPanel
              activeTabId={activeTabId}
              tabId={TabIds.Stats}
              sx={{ height: '100%' }}
              loading={loadingGames}
            >
              <NFLStats games={games} />
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
