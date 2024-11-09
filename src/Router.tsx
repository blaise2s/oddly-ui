import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router';
import { App } from './App';
import { Login } from './Login';
import { LogoutContainer } from './LogoutContainer';
import { PublicRoutes } from './routes';
import { QueryBuilderContainer } from './QueryBuilder/QueryBuilderContainer';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={`${PublicRoutes.Login}`} element={<Login />} />
      <Route path={`${PublicRoutes.Logout}`} element={<LogoutContainer />} />
      <Route
        path={`${PublicRoutes.QueryBuilder}`}
        element={<QueryBuilderContainer />}
      />
      {/* TODO: Auth0 authentication and lock down the app (private routes) */}
      <Route path='*' element={<App />} />
    </Route>,
  ),
);
