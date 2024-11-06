import { Box } from '@mui/material';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Account } from './Account';
import { Home } from './Home';
import { NavBar } from './NavBar';
import { NFLContainer } from './NFLContainer';
import { PrivateRoutes } from './routes';

export const App = () => {
  return (
    <Routes>
      <Route
        element={
          <Box
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <NavBar />
            <Box sx={{ flex: '1', overflow: 'auto' }}>
              <Outlet />
            </Box>
          </Box>
        }
      >
        <Route path={`${PrivateRoutes.Home}`} element={<Home />} />
        <Route path={`${PrivateRoutes.NFL}`} element={<NFLContainer />} />
        <Route path={`${PrivateRoutes.Account}`} element={<Account />} />
      </Route>
    </Routes>
  );
};
