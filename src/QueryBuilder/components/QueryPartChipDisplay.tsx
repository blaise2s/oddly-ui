/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { QueryPart } from '../queryBuilderTypesAndConstants';
import { getDisplayValue } from '../queryBuilderUtils';

interface QueryPartChipDisplayProps {
  queryPart: QueryPart<any>;
}

export const QueryPartChipDisplay = ({
  queryPart,
}: QueryPartChipDisplayProps) => {
  const column = queryPart.column.displayText;
  const operator =
    queryPart?.operator?.chipDisplayText || queryPart?.operator?.displayText;
  const sort = queryPart?.sort?.displayText;
  const value = getDisplayValue(queryPart);
  return (
    <Box>
      <Box component='span'>{sort ? `Group by ${column}` : column}</Box>
      <Box component='span' sx={{ pl: '0.25rem', fontWeight: 700 }}>
        {operator || sort || ''}
      </Box>
      {value && (
        <Box component='span' pl='0.25rem'>
          {value}
        </Box>
      )}
    </Box>
  );
};
