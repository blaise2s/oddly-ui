import { Box, SxProps } from '@mui/material';
import { useEffect } from 'react';
import { Column, InputFoci } from '../../queryBuilderTypesAndConstants';
import { useQueryBuilderContext } from '../QueryBuilderContext';
import { QueryBuilderColumnInput } from './QueryBuilderColumnInput';
import { QueryBuilderOperatorInput } from './QueryBuilderOperatorInput';
import { QueryBuilderValueInput } from './QueryBuilderValueInput';

const getTextFieldOverrides = (minTextFieldWidth: string): SxProps => {
  return {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '& input': {
        minWidth: `${minTextFieldWidth} !important`,
      },
    },
  };
};

interface QueryBuilderInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Column<any>[];
  minTextFieldWidth?: string;
  sx?: SxProps;
}

export const QueryBuilderInput = ({
  columns,
  minTextFieldWidth = '8rem',
  sx,
}: QueryBuilderInputProps) => {
  const {
    currentlyBuildingFilterQuery,
    inputFocus,
    columnRef,
    operatorRef,
    valueRef,
  } = useQueryBuilderContext();

  const textFieldOverrides = getTextFieldOverrides(minTextFieldWidth);

  useEffect(() => {
    switch (inputFocus) {
      case InputFoci.Column:
        columnRef.current?.focus();
        break;

      case InputFoci.Operator:
        operatorRef.current?.focus();
        break;

      case InputFoci.Value:
        valueRef.current?.focus();
        break;
    }
  }, [inputFocus, columnRef, operatorRef, valueRef]);

  return (
    <Box sx={sx}>
      {inputFocus === InputFoci.Column && (
        <QueryBuilderColumnInput
          columns={columns}
          textFieldOverrides={textFieldOverrides}
        />
      )}

      {inputFocus === InputFoci.Operator &&
        currentlyBuildingFilterQuery.column && (
          <QueryBuilderOperatorInput textFieldOverrides={textFieldOverrides} />
        )}

      {inputFocus === InputFoci.Value &&
        currentlyBuildingFilterQuery.column &&
        currentlyBuildingFilterQuery.operator && (
          <QueryBuilderValueInput textFieldOverrides={textFieldOverrides} />
        )}
    </Box>
  );
};
