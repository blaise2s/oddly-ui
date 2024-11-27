import { Box, SxProps, Typography } from '@mui/material';
import { QueryPartTypes } from '../queryBuilderTypesAndConstants';
import { getDisplayValue } from '../queryBuilderUtils';
import { useQueryBuilderContext } from './QueryBuilderContext';

interface QueryViewerProps {
  sx?: SxProps;
}

/**
 *
 * This component displays the query parts in a human-readable format.
 * By no means is it a full-fledged query viewer, but it should be
 * enough for the purposes of this demo.
 */
export const QueryViewer = ({ sx }: QueryViewerProps) => {
  const { queryParts } = useQueryBuilderContext();

  if (!queryParts.length) {
    return <></>;
  }

  const andQueryParts = queryParts.length - 1;
  const firstGroupingIndex =
    queryParts.findIndex(
      (queryParts) => queryParts.type === QueryPartTypes.Grouping,
    ) - 1;
  return (
    <Box sx={sx}>
      {queryParts.map((queryPart, index) => {
        const operator = queryPart?.operator;
        const sort = queryPart?.sort;
        return (
          <Box key={queryPart.id} component='span'>
            <Typography component='span'>
              <Box component='span'>{queryPart.column.displayText}</Box>
              {operator && (
                <Box component='span' px='0.25rem'>
                  {operator.displayText}
                </Box>
              )}
              {sort && (
                <Box component='span' px='0.25rem'>
                  {sort.displayText}
                </Box>
              )}
              <Box component='span'>{getDisplayValue(queryPart)}</Box>
            </Typography>
            {index < andQueryParts && (
              <Typography component='span' px='0.25rem' fontWeight={700}>
                {(index < firstGroupingIndex || firstGroupingIndex === -2) &&
                  'AND'}
                {index >= firstGroupingIndex &&
                  firstGroupingIndex !== -2 &&
                  'GROUP BY'}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
