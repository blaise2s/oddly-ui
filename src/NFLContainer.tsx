import { Box } from '@mui/material';
import { NFLContent } from './NFLContent';
import { NFLSidebar } from './NFLSidebar';

export const NFLContainer = () => {
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
        <NFLSidebar />
      </Box>
      <Box sx={{ flex: '1', overflow: 'auto' }}>
        <Box height='100%' display='flex' flexDirection='column'>
          <NFLContent />
        </Box>
      </Box>
    </Box>
  );
};
