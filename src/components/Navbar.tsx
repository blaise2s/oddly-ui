import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { PublicRoutes } from '../routes/routeDefinitions';
import { navigateIfNotCurrentPath } from '../utils/navigationUtils';
import { BrandText } from './BrandText';
import { Menu } from './common/Menu/Menu';

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
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position='sticky' elevation={elevation}>
      <Toolbar>
        {/* Medium and larger */}
        <BrandText
          variant='h3'
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
            color: 'white',
          }}
          component={Button}
          onClick={() => navigate(PublicRoutes.Landing)}
          withIcon
        />
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'flex-end',
            columnGap: 2,
          }}
        >
          {Pages.map(({ title, route }) => (
            <Button
              key={title}
              sx={{ color: 'white' }}
              onClick={() => navigate(route)}
            >
              {title}
            </Button>
          ))}
        </Box>

        {/* Smaller than medium */}
        <BrandText
          variant={xs ? 'h4' : 'h3'}
          sx={{
            display: {
              xs: 'flex',
              md: 'none',
            },
            color: 'white',
          }}
          component={Button}
          onClick={() => navigate(PublicRoutes.Landing)}
          withIcon
          iconSize={xs ? '2rem' : undefined}
        />
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'flex-end',
          }}
        >
          <Menu
            id='navbar-menu'
            trigger={{ icon: <MenuIcon />, iconOpen: <CloseIcon /> }}
            IconButtonProps={{
              sx: { color: 'white' },
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            items={Pages.map(({ title, route }) => ({
              id: title,
              name: title,
              onClick: () => navigate(route),
            }))}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
