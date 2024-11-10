import { Autocomplete, TextField } from '@mui/material';
import { Column, InputFoci } from '../../queryBuilderTypesAndConstants';
import { useQueryBuilderContext } from '../QueryBuilderContext';
import { BaseQueryBuilderInputFieldProps } from './queryBuilderInputTypes';

interface QueryBuilderColumnInputProps extends BaseQueryBuilderInputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Column<any>[];
}

export const QueryBuilderColumnInput = ({
  columns,
  textFieldOverrides,
}: QueryBuilderColumnInputProps) => {
  const {
    currentlyBuildingFilterQuery,
    setCurrentlyBuildingFilterQuery,
    setInputFocus,
    columnRef,
  } = useQueryBuilderContext();

  return (
    <Autocomplete
      options={columns}
      getOptionLabel={(column) => column.displayText}
      getOptionKey={(column) => column.id}
      value={
        currentlyBuildingFilterQuery?.column
          ? currentlyBuildingFilterQuery.column
          : undefined
      }
      onChange={(_event, column) => {
        setCurrentlyBuildingFilterQuery(() => ({
          column: column || undefined,
        }));
        if (column) {
          setInputFocus(InputFoci.Operator);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={columnRef}
          variant='outlined'
          color='info'
          placeholder='Select Column'
          sx={textFieldOverrides}
        />
      )}
    />
  );
};
