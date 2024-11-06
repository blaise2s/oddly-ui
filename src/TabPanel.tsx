import { Box, CircularProgress, SxProps } from '@mui/material';
import { ReactNode } from 'react';

interface TabPanelProps {
  tabId: string;
  activeTabId: string;
  children?: ReactNode;
  sx?: SxProps;
  loading?: boolean;
}

export const TabPanel = ({
  tabId,
  activeTabId,
  children,
  sx,
  loading,
}: TabPanelProps) => {
  const hidden = activeTabId !== tabId;
  return (
    <Box role='tabpanel' hidden={hidden} sx={sx}>
      {loading ? (
        <Box
          height='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <CircularProgress />
        </Box>
      ) : (
        <>{!hidden && children}</>
      )}
    </Box>
  );
};
