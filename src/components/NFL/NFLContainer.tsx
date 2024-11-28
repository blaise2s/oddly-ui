import { Box } from '@mui/material';
import { NFLContent } from './NFLContent';
import { NFLContextProvider } from './NFLContextProvider';
import { NFLSidebar } from './NFLSidebar';

export const NFLContainer = () => {
  return (
    <NFLContextProvider>
      <Box sx={{ height: '100%', overflow: 'auto', display: 'flex' }}>
        <Box
          sx={(theme) => {
            return {
              overflow: 'auto',
              width: '18rem',
              borderRight: `1px solid ${theme.palette.grey[300]}`,
              backgroundColor: `${theme.palette.grey[100]}`,
            };
          }}
        >
          <NFLSidebar sx={{ marginBottom: '10rem' }} />
        </Box>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <NFLContent />
        </Box>
      </Box>
    </NFLContextProvider>
  );
};
