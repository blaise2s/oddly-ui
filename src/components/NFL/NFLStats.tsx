import { Grid2 as Grid, Typography } from '@mui/material';
import { NFLGame } from './nflTypes';
import { compileStats, getPercentage, splitAndCapitalize } from './nflUtils';

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
            key={label}
            label={splitAndCapitalize(label)}
            value={
              isTotal || games?.length === 0
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
