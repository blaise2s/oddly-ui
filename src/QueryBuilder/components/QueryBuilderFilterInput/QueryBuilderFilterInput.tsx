import { Box, SxProps } from '@mui/material';
import { useEffect } from 'react';
import { Column, FilterInputFoci } from '../../queryBuilderTypesAndConstants';
import { getTextFieldOverrides } from '../../queryBuilderUtils';
import { useQueryBuilderContext } from '../QueryBuilderContext';
import { QueryBuilderColumnInput } from './QueryBuilderColumnInput';
import { QueryBuilderOperatorInput } from './QueryBuilderOperatorInput';
import { QueryBuilderValueInput } from './QueryBuilderValueInput';

interface QueryBuilderFilterInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Column<any>[];
  minTextFieldWidth?: string;
  sx?: SxProps;
}

export const QueryBuilderFilterInput = ({
  columns,
  minTextFieldWidth = '8rem',
  sx,
}: QueryBuilderFilterInputProps) => {
  const {
    currentlyBuildingFilterQuery,
    filterInputFocus,
    columnRef,
    operatorRef,
    valueRef,
  } = useQueryBuilderContext();

  const textFieldOverrides = getTextFieldOverrides(minTextFieldWidth);

  useEffect(() => {
    switch (filterInputFocus) {
      case FilterInputFoci.Column:
        columnRef.current?.focus();
        break;

      case FilterInputFoci.Operator:
        operatorRef.current?.focus();
        break;

      case FilterInputFoci.Value:
        valueRef.current?.focus();
        break;
    }
  }, [filterInputFocus, columnRef, operatorRef, valueRef]);

  return (
    <Box sx={sx}>
      {filterInputFocus === FilterInputFoci.Column && (
        <QueryBuilderColumnInput
          columns={columns}
          textFieldOverrides={textFieldOverrides}
        />
      )}

      {filterInputFocus === FilterInputFoci.Operator &&
        currentlyBuildingFilterQuery.column && (
          <QueryBuilderOperatorInput textFieldOverrides={textFieldOverrides} />
        )}

      {filterInputFocus === FilterInputFoci.Value &&
        currentlyBuildingFilterQuery.column &&
        currentlyBuildingFilterQuery.operator && (
          <QueryBuilderValueInput textFieldOverrides={textFieldOverrides} />
        )}
    </Box>
  );
};
