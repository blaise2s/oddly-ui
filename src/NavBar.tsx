import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SportsIcon from '@mui/icons-material/Sports';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PrivateRoutes, PublicRoutes } from './routes';
import { navigateIfNotCurrentPath } from './utils/navigationUtils';

const NavBarMenus = {
  Nav: 'nav',
  User: 'user',
} as const;
type NavBarMenu = (typeof NavBarMenus)[keyof typeof NavBarMenus];

interface Page {
  title: string;
  route: string;
}

const Pages: Page[] = [
  {
    title: 'NFL',
    route: PrivateRoutes.NFL,
  },
];
const Settings: Page[] = [
  {
    title: 'Account',
    route: PrivateRoutes.Account,
  },
  {
    title: 'Logout',
    route: PublicRoutes.Logout,
  },
];

export const NavBar = () => {
  const { pathname } = useLocation();
  const _navigate = useNavigate();
  const navigate = navigateIfNotCurrentPath(pathname, _navigate);

  const [navAnchorEl, setNavAnchorEl] = useState<null | HTMLElement>(null);
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuVisibility = (
    forMenu: NavBarMenu,
    event?: MouseEvent<HTMLElement>,
  ) => {
    switch (forMenu) {
      case NavBarMenus.Nav:
        setNavAnchorEl(event ? event.currentTarget : null);
        break;

      case NavBarMenus.User:
        setUserAnchorEl(event ? event.currentTarget : null);
        break;

      default:
        break;
    }
  };

  return (
    <AppBar position='relative' sx={{ boxShadow: 'none' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <SportsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            onClick={() => navigate(PrivateRoutes.Home)}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            ODDLY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Pages.map(({ title, route }) => (
              <Button
                key={title}
                onClick={() => {
                  handleMenuVisibility('nav');
                  navigate(route);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={(event) => handleMenuVisibility('nav', event)}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={navAnchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(navAnchorEl)}
              onClose={() => handleMenuVisibility('nav')}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {Pages.map(({ title, route }) => (
                <MenuItem
                  key={title}
                  onClick={() => {
                    handleMenuVisibility('nav');
                    navigate(route);
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SportsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            onClick={() => navigate(PrivateRoutes.Home)}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            ODDLY
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton
                onClick={(event) => handleMenuVisibility('user', event)}
                sx={{ p: 0 }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={userAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(userAnchorEl)}
              onClose={() => handleMenuVisibility('user')}
            >
              {Settings.map(({ title, route }) => (
                <MenuItem
                  key={title}
                  onClick={() => {
                    handleMenuVisibility('user');
                    navigate(route);
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
