import { NavigateFunction, NavigateOptions, To } from 'react-router';

export const navigateIfNotCurrentPath = (
  pathname: string,
  navigate: NavigateFunction,
) => {
  return (to: To, options?: NavigateOptions) => {
    if (to !== pathname) {
      navigate(to, options);
    }
  };
};
