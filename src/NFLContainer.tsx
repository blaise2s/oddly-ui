import { Box } from '@mui/material';
import { NFLContent } from './NFLContent';
import { useNFLContext } from './NFLContext';
import { NFLSidebar } from './NFLSidebar';
import { useFetchNflGames } from './nflServices';

export const NFLContainer = () => {
  const { seasons, teams, headToHeadSelected } = useNFLContext();

  const selectedTeamNames = teams.reduce<string[]>((accumulator, team) => {
    if (team.selected) {
      accumulator.push(team.name);
    }
    return accumulator;
  }, []);

  const { data: games, isFetching: loadingGames } = useFetchNflGames({
    seasons: seasons.reduce<number[]>((accumulator, season) => {
      if (season.selected) {
        accumulator.push(season.year);
      }
      return accumulator;
    }, []),
    teams: selectedTeamNames,
    headToHead: headToHeadSelected,
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
            paddingBottom: '10rem',
          };
        }}
      >
        <NFLSidebar selectedTeamNames={selectedTeamNames} />
      </Box>
      <Box sx={{ flex: '1', overflow: 'auto' }}>
        <Box height='100%' display='flex' flexDirection='column'>
          <NFLContent games={games} loadingGames={loadingGames} />
        </Box>
      </Box>
    </Box>
  );
};
