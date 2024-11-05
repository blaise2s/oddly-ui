import { Box, Typography } from '@mui/material';

export const Home = () => {
  return (
    <Box
      height='100%'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Typography
          variant='h1'
          noWrap
          sx={{
            fontWeight: 500,
          }}
        >
          Welcome to
        </Typography>
        <Typography
          variant='h1'
          noWrap
          color='primary'
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
          }}
        >
          ODDLY
        </Typography>
      </Box>
    </Box>
  );
};
