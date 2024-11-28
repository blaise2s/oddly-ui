import { RouteObject } from 'react-router';
import { Home } from '../components/Home';
import { NFLContainer } from '../components/NFL/NFLContainer';
import { QueryBuilderContainer } from '../QueryBuilder/components/QueryBuilderContainer';
import { Root } from '../components/Root';
import { PublicRoutes } from './routeDefinitions';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: PublicRoutes.Landing,
        element: <Home />,
      },
      {
        path: PublicRoutes.NFL,
        element: <NFLContainer />,
      },
    ],
  },
  {
    path: PublicRoutes.QueryBuilder,
    element: <QueryBuilderContainer />,
  },
];
