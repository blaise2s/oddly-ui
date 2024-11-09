/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { QueryPart } from './queryBuilderTypesAndConstants';
import { getDisplayValue } from './queryBuilderUtils';

interface QueryPartChipDisplayProps {
  queryPart: QueryPart<any>;
}

export const QueryPartChipDisplay = ({
  queryPart,
}: QueryPartChipDisplayProps) => {
  const column = queryPart.column.displayText;
  const operator =
    queryPart.operator?.chipDisplayText || queryPart.operator.displayText;
  const value = getDisplayValue(queryPart);
  return (
    <Box>
      <Box component='span'>{column}</Box>
      <Box component='span' sx={{ px: '0.25rem', fontWeight: 700 }}>
        {operator}
      </Box>
      <Box component='span'>{value}</Box>
    </Box>
  );
};
