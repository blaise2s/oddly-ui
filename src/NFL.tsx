import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NumbersIcon from '@mui/icons-material/Numbers';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import {
  Box,
  CircularProgress,
  Divider,
  styled,
  SxProps,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { format, toDate } from 'date-fns';
import { useState } from 'react';
import { FilterList } from './FilterList';
import { NFL_SEASONS, NFL_TEAMS } from './nflConstants';
import { useFetchNflGames } from './nflServices';
import { NFLTeam } from './nflTypes';

interface Column {
  name: string;
  sx?: SxProps;
}
const Columns: Column[] = [
  { name: 'Season' },
  { name: 'Date' },
  { name: 'DoW' },
  { name: 'Time ET' },
  { name: 'Favorite' },
  { name: 'Score Favorite' },
  { name: 'Underdog' },
  { name: 'Score Underdog' },
  { name: 'Location' },
  { name: 'Spread' },
  { name: 'Spread Result' },
  { name: 'OU' },
  { name: 'OU Result' },
  { name: 'Overtime' },
  { name: 'Postseason' },
  { name: 'Favorite Seed' },
  { name: 'Underdog Seed' },
  { name: 'Notes' },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
  },
}));

const InitiallySelectedSeasonsIndices = [0];
const InitiallySelectedTeamIndices = 'all';

export const NFL = () => {
  const [selectedSeasons, setSelectedSeasons] = useState<number[]>([
    ...InitiallySelectedSeasonsIndices.map((idx) => NFL_SEASONS[idx]),
  ]);
  const [selectedTeams, setSelectedTeams] = useState<NFLTeam[]>(NFL_TEAMS);

  const { data: games, isFetching } = useFetchNflGames({
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
        {isFetching ? (
          <Box
            height='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer sx={{ maxHeight: '100%' }}>
            <Table aria-label='NFL Games Table' stickyHeader>
              <TableHead>
                <TableRow>
                  {Columns.map(({ name, sx }, index) => {
                    return (
                      <StyledTableCell key={index} sx={sx}>
                        {name}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {!games || games.length <= 0 ? (
                  <Typography>
                    TODO: Message for when no games meet criteria...
                  </Typography>
                ) : (
                  games.map(
                    ({
                      id,
                      season,
                      game_date,
                      day_of_week,
                      time_eastern,
                      favorite,
                      score_favorite,
                      underdog,
                      score_underdog,
                      game_loc,
                      spread,
                      spread_res,
                      over_under,
                      over_under_res,
                      overtime,
                      postseason,
                      favorite_seed,
                      underdog_seed,
                      notes,
                    }) => {
                      return (
                        <TableRow key={id}>
                          <StyledTableCell>{season}</StyledTableCell>
                          <StyledTableCell>
                            {format(toDate(game_date), 'MM/dd/yyyy')}
                          </StyledTableCell>
                          <StyledTableCell>{day_of_week}</StyledTableCell>
                          <StyledTableCell>{time_eastern}</StyledTableCell>
                          <StyledTableCell>{favorite}</StyledTableCell>
                          <StyledTableCell>{score_favorite}</StyledTableCell>
                          <StyledTableCell>{underdog}</StyledTableCell>
                          <StyledTableCell>{score_underdog}</StyledTableCell>
                          <StyledTableCell>{game_loc}</StyledTableCell>
                          <StyledTableCell>{spread}</StyledTableCell>
                          <StyledTableCell>{spread_res}</StyledTableCell>
                          <StyledTableCell>{over_under}</StyledTableCell>
                          <StyledTableCell>{over_under_res}</StyledTableCell>
                          <StyledTableCell>
                            {overtime && <CheckCircleIcon color='secondary' />}
                          </StyledTableCell>
                          <StyledTableCell>
                            {postseason && (
                              <CheckCircleIcon color='secondary' />
                            )}
                          </StyledTableCell>
                          <StyledTableCell>{favorite_seed}</StyledTableCell>
                          <StyledTableCell>{underdog_seed}</StyledTableCell>
                          <StyledTableCell>{notes}</StyledTableCell>
                        </TableRow>
                      );
                    },
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};
