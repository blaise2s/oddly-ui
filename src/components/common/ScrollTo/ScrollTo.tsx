import { Box, Fade, useScrollTrigger } from '@mui/material';
import { ReactElement } from 'react';
import { scrollTo } from '../../../utils/scrollUtils';

interface ScrollToProps {
  scrollToId: string;
  scrollIntoViewOptions?: ScrollIntoViewOptions;
  threshold?: number;
  disableHysteresis?: boolean;
  bottom?: string | number;
  right?: string | number;
  children?: ReactElement;
}

export const ScrollTo = ({
  scrollToId,
  scrollIntoViewOptions,
  threshold = 100,
  disableHysteresis = true,
  bottom = 16,
  right = 16,
  children,
}: ScrollToProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis,
    threshold,
  });

  return (
    <Fade in={trigger}>
      <Box
        onClick={(event) =>
          scrollTo({ scrollToId, event, scrollIntoViewOptions })
        }
        role='presentation'
        sx={{ position: 'fixed', bottom, right }}
      >
        {children}
      </Box>
    </Fade>
  );
};
