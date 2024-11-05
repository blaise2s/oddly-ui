import { Grid2 as Grid, Typography } from '@mui/material';
import { NFLGame } from './nflTypes';

interface Stats {
  [key: string]: number;
  total_games: number;
  over: number;
  under: number;
  over_under_pushed: number;
  favorite_won: number;
  underdog_won: number;
  tie_games: number;
  spread_won: number;
  spread_lost: number;
  spread_pushed: number;
  overtime_games: number;
}

const compileStats = (games: NFLGame[]): Stats => {
  const total_games = games.length;
  let over = 0;
  let under = 0;
  let over_under_pushed = 0;
  let favorite_won = 0;
  let underdog_won = 0;
  let tie_games = 0;
  let spread_won = 0;
  let spread_lost = 0;
  let spread_pushed = 0;
  let overtime_games = 0;

  games.forEach(
    ({ over_under_res, spread_res, overtime, tie, favorite_won: fav_won }) => {
      switch (over_under_res) {
        case 'OVER':
          over += 1;
          break;
        case 'UNDER':
          under += 1;
          break;
        case 'PUSH':
          over_under_pushed += 1;
          break;
      }

      switch (spread_res) {
        case 'WIN':
          spread_won += 1;
          break;
        case 'LOSS':
          spread_lost += 1;
          break;
        case 'PUSH':
          spread_pushed += 1;
          break;
      }

      if (overtime) {
        overtime_games += 1;
      }

      if (tie) {
        tie_games += 1;
      }

      if (fav_won) {
        favorite_won += 1;
      } else if (!tie) {
        underdog_won += 1;
      }
    },
  );

  return {
    total_games,
    over,
    under,
    over_under_pushed,
    favorite_won,
    underdog_won,
    tie_games,
    spread_won,
    spread_lost,
    spread_pushed,
    overtime_games,
  };
};

interface GetPercentagePayload {
  stat: number;
  total: number;
  fractionalDigits?: number;
}
const getPercentage = ({
  stat,
  total,
  fractionalDigits,
}: GetPercentagePayload) => {
  const percentage = (stat / total) * 100;
  return fractionalDigits
    ? `${percentage.toFixed(fractionalDigits)}%`
    : percentage;
};

const splitAndCapitalize = (toSplit: string, splitOn = '_') => {
  return toSplit
    .split(splitOn)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

interface StatPairProps {
  label: string;
  value: string | number;
}

const StatPair = ({ label, value }: StatPairProps) => {
  return (
    <>
      <Grid size={{ sm: 6, md: 3 }}>
        <Typography variant='h5'>{label}</Typography>
      </Grid>
      <Grid size={{ sm: 6, md: 3 }}>
        <Typography variant='h6' sx={{ fontWeight: '700' }}>
          {value}
        </Typography>
      </Grid>
    </>
  );
};

interface NFLStatsProps {
  games?: NFLGame[];
}

export const NFLStats = ({ games }: NFLStatsProps) => {
  const stats = games ? compileStats(games) : null;

  if (!stats) {
    return;
  }

  const statPairs = Object.entries(stats);
  const totalGames = stats.total_games;
  return (
    <Grid container spacing={2} p='1rem 1rem 0 1rem'>
      {statPairs.map(([label, value]) => {
        const isTotal = label === 'total_games';
        return (
          <StatPair
            label={splitAndCapitalize(label)}
            value={
              isTotal
                ? value
                : getPercentage({
                    stat: value,
                    total: totalGames,
                    fractionalDigits: 2,
                  })
            }
          />
        );
      })}
    </Grid>
  );
};
