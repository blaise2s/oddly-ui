import { createBrowserRouter } from 'react-router';
import { RouterProvider as ReactRouterDOMRouterProvider } from 'react-router/dom';
import { routes } from '../routes';

const router = createBrowserRouter(routes);

export const RouterProvider = () => {
  return <ReactRouterDOMRouterProvider router={router} />;
};
