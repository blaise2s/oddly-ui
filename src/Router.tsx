import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { App } from './App';
import { Login } from './Login';
import { LogoutContainer } from './LogoutContainer';
import { PublicRoutes } from './routes';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={`${PublicRoutes.Login}`} element={<Login />} />
      <Route path={`${PublicRoutes.Logout}`} element={<LogoutContainer />} />
      {/* TODO: Auth0 authentication and lock down the app (private routes) */}
      <Route path='*' element={<App />} />
    </Route>,
  ),
);
