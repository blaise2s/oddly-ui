import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import {
  Box,
  styled,
  SxProps,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { format, toDate } from 'date-fns';
import { Sorts } from './globalTypes';
import { GamesTableColumns, NFLTeamLogoMap } from './nflConstants';
import { useNFLContext } from './NFLContext';
import { NFLGame, OverUnderResult, SpreadResult } from './nflTypes';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
  },
}));

const OverUnderResultIcon = ({ result }: { result: OverUnderResult }) => {
  switch (result) {
    case 'OVER':
      return <ArrowUpwardIcon />;
    case 'UNDER':
      return <ArrowDownwardIcon />;
    case 'PUSH':
      return <LocalParkingIcon />;
  }
};

const SpreadResultIcon = ({ result }: { result: SpreadResult }) => {
  switch (result) {
    case 'WIN':
      return <CheckIcon color='success' />;
    case 'LOSS':
      return <CloseIcon color='error' />;
    case 'PUSH':
      return <LocalParkingIcon color='disabled' />;
  }
};

const TeamLogo = ({
  currentName,
  sx,
}: {
  currentName: string;
  sx?: SxProps;
}) => <Box component='img' sx={sx} src={NFLTeamLogoMap.get(currentName)} />;

interface TeamWithLogoProps {
  currentName: string;
  name: string;
  logoPosition?: 'beginning' | 'end';
}
const TeamWithLogo = ({
  currentName,
  name,
  logoPosition = 'beginning',
}: TeamWithLogoProps) => {
  return (
    <Box display='flex' alignItems='center'>
      {logoPosition === 'beginning' && (
        <TeamLogo
          currentName={currentName}
          sx={{
            width: '2.5rem',
            pr: '0.75rem',
          }}
        />
      )}
      <Box>{name}</Box>
      {logoPosition === 'end' && (
        <TeamLogo
          currentName={currentName}
          sx={{
            width: '2.5rem',
            pl: '0.75rem',
          }}
        />
      )}
    </Box>
  );
};

interface NFLGamesTableProps {
  games?: NFLGame[];
}

export const NFLGamesTable = ({ games }: NFLGamesTableProps) => {
  const { gameOrderMap } = useNFLContext();

  return (
    <TableContainer sx={{ maxHeight: '100%' }}>
      <Table aria-label='NFL Games Table' stickyHeader>
        <TableHead>
          <TableRow>
            {GamesTableColumns.map(
              ({ id, name, sx, align, sortable, initialSort }) => {
                const active = gameOrderMap.has(id);
                const sortProps = gameOrderMap.get(id);
                const sortDirection = sortProps && sortProps.sort;

                return (
                  <StyledTableCell
                    key={id}
                    sx={sx}
                    align={align}
                    sortDirection={sortDirection}
                  >
                    {sortable ? (
                      <TableSortLabel
                        active={active}
                        direction={
                          active ? sortDirection : initialSort || Sorts.Asc
                        }
                      >
                        {name}
                        {active && (
                          <Box component='span' sx={visuallyHidden}>
                            {sortDirection === 'desc'
                              ? 'sorted descending'
                              : 'sorted ascending'}
                          </Box>
                        )}
                      </TableSortLabel>
                    ) : (
                      <>{name}</>
                    )}
                  </StyledTableCell>
                );
              },
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {!games || games.length <= 0 ? (
            <TableRow>
              <StyledTableCell
                colSpan={GamesTableColumns.length}
                align='center'
              >
                <Typography p='2rem'>
                  No data to display, refine search criteria.
                </Typography>
              </StyledTableCell>
            </TableRow>
          ) : (
            games.map(
              ({
                id,
                season,
                game_date,
                day_of_week,
                time_eastern,
                favorite,
                current_favorite,
                score_favorite,
                underdog,
                current_underdog,
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
                    <StyledTableCell align='center'>
                      <TeamWithLogo
                        currentName={current_favorite}
                        name={favorite}
                      />
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {score_favorite}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {score_underdog}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <TeamWithLogo
                        currentName={current_underdog}
                        name={underdog}
                        logoPosition='end'
                      />
                    </StyledTableCell>
                    <StyledTableCell>{game_loc}</StyledTableCell>
                    <StyledTableCell>{spread}</StyledTableCell>
                    <StyledTableCell>
                      <SpreadResultIcon result={spread_res} />
                    </StyledTableCell>
                    <StyledTableCell>{over_under}</StyledTableCell>
                    <StyledTableCell>
                      <OverUnderResultIcon result={over_under_res} />
                    </StyledTableCell>
                    <StyledTableCell>
                      {overtime && <CheckCircleIcon color='success' />}
                    </StyledTableCell>
                    <StyledTableCell>
                      {postseason && <CheckCircleIcon color='success' />}
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
  );
};
