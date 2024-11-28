import MenuIcon from '@mui/icons-material/Menu';
import SportsIcon from '@mui/icons-material/Sports';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PublicRoutes } from '../routes/routeDefinitions';
import { navigateIfNotCurrentPath } from '../utils/navigationUtils';

const NavbarMenus = {
  Nav: 'nav',
} as const;
type NavbarMenu = (typeof NavbarMenus)[keyof typeof NavbarMenus];

interface Page {
  title: string;
  route: string;
}

const Pages: Page[] = [
  {
    title: 'NFL',
    route: PublicRoutes.NFL,
  },
];

interface NavbarProps {
  elevation?: number;
}

export const Navbar = ({ elevation }: NavbarProps) => {
  const { pathname } = useLocation();
  const _navigate = useNavigate();
  const navigate = navigateIfNotCurrentPath(pathname, _navigate);

  const [navAnchorEl, setNavAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuVisibility = (
    forMenu: NavbarMenu,
    event?: MouseEvent<HTMLElement>,
  ) => {
    switch (forMenu) {
      case NavbarMenus.Nav:
        setNavAnchorEl(event ? event.currentTarget : null);
        break;

      default:
        break;
    }
  };

  return (
    <AppBar position='sticky' elevation={elevation}>
      <Toolbar>
        {/* Medium and larger */}
        <SportsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant='h6'
          noWrap
          onClick={() => navigate(PublicRoutes.Landing)}
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

        {/* Smaller than medium */}
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
          onClick={() => navigate(PublicRoutes.Landing)}
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
      </Toolbar>
    </AppBar>
  );
};
