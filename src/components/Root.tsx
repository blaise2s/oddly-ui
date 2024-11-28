import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Fab } from '@mui/material';
import { Outlet } from 'react-router';
import { ElevationScroll } from './common/ElevationScroll/ElevationScroll';
import { ScrollTo } from './common/ScrollTo/ScrollTo';
import { Navbar } from './Navbar';

export const Root = () => {
  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <ElevationScroll elevation={1}>
          <Navbar />
        </ElevationScroll>
        <Box id='top-of-page' />
        <Outlet />
      </Box>
      <ScrollTo scrollToId='top-of-page'>
        <Fab size='small' color='secondary' aria-label='Scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTo>
    </>
  );
};
