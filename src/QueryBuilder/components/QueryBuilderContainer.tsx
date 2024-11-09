import { Box } from '@mui/material';
import { QueryBuilder } from './QueryBuilder';
import { QueryBuilderContextProvider } from './QueryBuilderContextProvider';
import { COLUMNS } from '../queryBuilderTypesAndConstants';
import { QueryViewer } from './QueryViewer';

export const QueryBuilderContainer = () => {
  return (
    <Box>
      <QueryBuilderContextProvider>
        <QueryBuilder columns={COLUMNS} inline sx={{ px: '1rem' }} />
        <QueryViewer sx={{ mt: '2rem', px: '1rem' }} />
      </QueryBuilderContextProvider>
    </Box>
  );
};
