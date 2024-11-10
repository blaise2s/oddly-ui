import { Box, SxProps } from '@mui/material';
import { useEffect } from 'react';
import { Column, GroupingInputFoci } from '../../queryBuilderTypesAndConstants';
import { getTextFieldOverrides } from '../../queryBuilderUtils';
import { useQueryBuilderContext } from '../QueryBuilderContext';
import { QueryBuilderGroupByInput } from './QueryBuilderGroupByInput';
import { QueryBuilderSortInput } from './QueryBuilderSortInput';

interface QueryBuilderGroupingInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Column<any>[];
  minTextFieldWidth?: string;
  sx?: SxProps;
}

export const QueryBuilderGroupingInput = ({
  columns,
  minTextFieldWidth = '8rem',
  sx,
}: QueryBuilderGroupingInputProps) => {
  const {
    currentlyBuildingGroupingQuery,
    groupingInputFocus,
    groupByRef,
    sortRef,
  } = useQueryBuilderContext();

  const textFieldOverrides = getTextFieldOverrides(minTextFieldWidth);

  useEffect(() => {
    if (groupingInputFocus !== null) {
      switch (groupingInputFocus) {
        case GroupingInputFoci.GroupBy:
          groupByRef.current?.focus();
          break;

        case GroupingInputFoci.Sort:
          sortRef.current?.focus();
          break;
      }
    }
  }, [groupingInputFocus, groupByRef, sortRef]);

  return (
    <Box sx={sx}>
      {(groupingInputFocus === GroupingInputFoci.GroupBy ||
        groupingInputFocus === null) && (
        <QueryBuilderGroupByInput
          columns={columns}
          textFieldOverrides={textFieldOverrides}
        />
      )}

      {groupingInputFocus === GroupingInputFoci.Sort &&
        currentlyBuildingGroupingQuery.column && (
          <QueryBuilderSortInput textFieldOverrides={textFieldOverrides} />
        )}
    </Box>
  );
};
