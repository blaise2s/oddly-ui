import { Box, SxProps, Typography } from '@mui/material';
import { useQueryBuilderContext } from './QueryBuilderContext';
import { getDisplayValue } from '../queryBuilderUtils';

interface QueryViewerProps {
  sx?: SxProps;
}

export const QueryViewer = ({ sx }: QueryViewerProps) => {
  const { queryParts } = useQueryBuilderContext();

  if (!queryParts.length) {
    return <></>;
  }

  const andQueryParts = queryParts.length - 1;
  return (
    <Box sx={sx}>
      {queryParts.map((queryPart, index) => {
        const operator = queryPart?.operator;
        return (
          <Box key={queryPart.id} component='span'>
            <Typography component='span'>
              <Box component='span'>{queryPart.column.displayText}</Box>
              {operator && (
                <Box component='span' px='0.25rem'>
                  {operator.displayText}
                </Box>
              )}
              <Box component='span'>{getDisplayValue(queryPart)}</Box>
            </Typography>
            {index < andQueryParts && (
              <Typography component='span' px='0.25rem' fontWeight={700}>
                AND
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
