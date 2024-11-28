import { useScrollTrigger } from '@mui/material';
import { cloneElement, ReactElement } from 'react';

interface ElevationScrollProps {
  elevation?: number;
  threshold?: number;
  disableHysteresis?: boolean;
  children?: ReactElement<{ elevation?: number }>;
}

export const ElevationScroll = ({
  elevation = 2,
  threshold = 0,
  disableHysteresis = true,
  children,
}: ElevationScrollProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis,
    threshold,
  });

  return children
    ? cloneElement(children, {
        elevation: trigger ? elevation : 0,
      })
    : null;
};
